import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import ProgressBar from "@ramonak/react-progress-bar";
import {useHistory,useParams} from 'react-router-dom';
import firebase from "../firebase";



const Update = ({user}) => {
    const storage = firebase.storage();
    let history = useHistory();
    let { id } = useParams();
   useEffect(()=>{
    if(user===""){
        history.replace('/')
    }
    axios.get(`https://asset-management-node.glitch.me/api/asset/${id}`)
    .then((res)=>{
        setName(res.data.filename);
        setSize(res.data.filesize);
        setType(res.data.filetype);

    })
   },[])
  
   
    const [name, setName ] = useState('');
    const [size,setSize] = useState(0);
    const [type,setType] = useState('');

    const [image,setImage] = useState('');
    const [img,setImg] = useState('');
    const[percentage ,setPercentage] = useState(0);
    const[loading,setLoading] = useState(false);
//check file type
function getExtension(filename) {
    var parts = filename.split('.');
    var ext =  parts[parts.length - 1];
    return ext;
  }

 //upload file
 
 const uploadfile = () => {
    if (image == null)
      return;
  
  
    // Sending File to Firebase Storage
    setLoading(true);
    storage.ref(`/images/${image.name}`).put(image)
      .on("state_changed",snap=>{
        const percent = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        setPercentage(percent);

      },setLoading(true), () => {
  
        // Getting Download Link
        storage.ref("images").child(image.name).getDownloadURL()
          .then((uri) => {
              console.log(uri);
            const url =`https://asset-management-node.glitch.me/api/asset/${id}`;
            const data = {
                filename : name,
                filedate: Date.now().toString(),
                filetype: type,
                fileurl: uri.toString(),
                filesize:size.toString()
                
            } ; 
            try{
                if(name!== "" && data.img !== ""){
                    axios.put(url,  data )
                    .then(response => {
                      console.log(response);
                      console.log(response.data);
                      setSize("");
                      setType("");
                      setName("");
                      setImg("");
                      setImage("");
                      setPercentage("");
                      setLoading(false);
    
                    })
                    
                }else{
                    return 0;
                }
            }
            catch(er){
                console.log(er);
            }
          })
      });
  } 

    const postData =(e)=>{
        e.preventDefault();
        if(name !== "" && image !== ""){
            
                uploadfile();
            
        }
        else{
            window.alert("all fields are required");
        } 
    }

    return ( <>
    {!loading?( <div className=" flex upload">
            <h3> Upload Your Asset </h3>
            
            <form onSubmit={(e)=>postData(e)}>
               <div>
               <input  onChange={(e)=>{
                   setImage(e.target.files[0])
                   let ext = getExtension(e.target.files[0].name);
                   setType(ext);
                   setSize(e.target.files[0].size)
                   }} id="thumbnail" type="file"/>
               
               </div>
             
               <div>
                  
                   <input value={name} onChange={(e)=>setName(e.target.value)} placeholder=" Title" for="name" type="text"  />
               </div>
              
               
                
                <button type="submit" >
                   <h4> Upload</h4>
                </button>
               
            </form>
                
        </div>

    ):(
        <div className="progrssbar">
            <h3> Uploading..</h3>
        <ProgressBar  completed={percentage}/>
        </div>
    )}
   
   
    
        </>);
}
 
export default Update;
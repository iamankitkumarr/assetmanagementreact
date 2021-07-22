import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import {useHistory,Link} from 'react-router-dom';

const Admin = ({user,setUser}) => {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState('');
    const [isDel,setIsDel] = useState(false)
    let history = useHistory();
useEffect(()=>{
    if(user===""){
        history.replace('/')
    }
    const url = "https://asset-management-node.glitch.me/api/assets";
    try{
        axios.get(url).then((res)=>{
          setData(res.data);
        
          setLoading(false);
        
          
        }).catch((err)=>{
          console.log(err);
        })
      }catch(err){
        console.log(err)
      }
},[loading,isDel])
    
 // const delMovie =(id)=>{
    //     axios.delete(`https://glacial-headland-57223.herokuapp.com/api/movie/${id}`)
    //     .then(()=>console.log("deleted"));
    // }
    const delAsset = (e,id) =>{
        setIsDel(false);
        e.preventDefault();
        axios.delete(`https://asset-management-node.glitch.me/api/asset/${id}`)
        .then(()=>{
            alert("file deleted!");
            setIsDel(true);
        })
    }
    const updateAsset = (id)=>{

    }
    return ( <table class="products-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>File Type</th>
        <th>File Size(MB)</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
    {loading ?<h1>loading..</h1>:
                  data.map((asset,key) => <>
                  
                  <tr key={key}>
        <td data-label="Product">{asset.filename}</td>
        <td data-label="Unlimited Plan">
            {asset.filetype}
        </td>
        <td data-label="Started Plan">
          {(parseInt(asset.filesize)/1024/1024).toFixed(2)}
        </td>
        <td data-label="Unlimited Plan" onClick={()=>updateAsset(asset._id)} >
            <Link to={`/update/${asset._id}`} >
                Update
            </Link>
        </td>
        <td data-label="Unlimited Plan" >
            <button onClick={(e)=>delAsset(e,asset._id)}>
            delete
            </button>
   
        </td>
      </tr>
                  
                  </>)
              }
      
      
    </tbody>
  </table> );
}
 
export default Admin;
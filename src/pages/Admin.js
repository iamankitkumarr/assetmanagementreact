import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import {useHistory,Link} from 'react-router-dom';

const Admin = ({user,setUser}) => {
    const [data,setData] = useState([]);
    const [currentData , setCurrentData] = useState([]);
    const [loading,setLoading] = useState('');
    const [isDel,setIsDel] = useState(false);
    const [search,setSearch] = useState('');
    const [isSearch,setIsSearch] = useState(false);
  
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
},[loading,isDel,isSearch])
    

    const delAsset = (e,id) =>{
        setIsDel(false);
        e.preventDefault();
        axios.delete(`https://asset-management-node.glitch.me/api/asset/${id}`)
        .then(()=>{
            alert("file deleted!");
            setIsDel(true);
        })
    }
    const searchAsset = (name)=>{
      setIsSearch(true);
      var result = data.filter(obj => {
        return obj.filename === name
      })
     setCurrentData(result);
     
    }
    const sortingType = (type)=>{
      setIsSearch(true);
      var result = data.filter(obj => {
        return obj.filetype === type
      })
     setCurrentData(result);
    }
    return ( <>
    <div id="adminBox">
      <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder=" Search for asset" for="name" type="text"  /> 
    <div className="button" onClick={()=>searchAsset(search)}>
        <p>Search</p>
    </div>
  
    <div class="select">
  <select id="standard-select" onChange={(e)=>sortingType(e.target.value)}>
    <option value="jpg">jpg</option>
    <option value="png">png</option>
    <option value="mp4">mp4</option>
    <option value="pdf">pdf</option>
    <option value="mp3">mp3</option>
    <option value="jpeg">jpeg</option>
    <option value="acc">acc</option>
    <option value="webm">webm</option>
  </select>
  <span class="focus"></span>

</div>
    </div>
  
    
    <table class="products-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>File Type</th>
        <th>File Size(MB)</th>
        <th>Date</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
    {isSearch ?
                  currentData.map((asset,key) => <>
                  
                  <tr key={key}>
        <td data-label="Product">{asset.filename}</td>
        <td data-label="Unlimited Plan">
            {asset.filetype}
        </td>
        <td data-label="Started Plan">
          {(parseInt(asset.filesize)/1024/1024).toFixed(2)}
        </td>
        <td data-label="Started Plan">
          {asset.createdAt}
        </td>
        <td data-label="Unlimited Plan"  >
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
     
                  
                  </>):<h1></h1>
              }
     <p>All Assets</p>         
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
        <td data-label="Started Plan">
          {asset.createdAt}
        </td>
        <td data-label="Unlimited Plan"  >
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
  </table></> );
}
 
export default Admin;
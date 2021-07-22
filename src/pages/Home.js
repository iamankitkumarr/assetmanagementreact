import cover from "../assets/banner.png"
import Card from '../components/Card';


import axios from 'axios';
import {useEffect,useState} from 'react';
const Home = () => {
  const [data,setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage,setDataPerPage] = useState(100);
  const [currentData , setCurrentData] = useState([]);
  const [pageNumber,setPageNumber] = useState([])

  const [loading,setLoading] = useState(true);
   const  handleClick=(e)=>{
        console.log(e.target.id);
        setCurrentPage(e.target.id);
        logic();
      };

      const logic = ()=>{
    
        const indexOfLastPage = currentPage * dataPerPage;
        const indexOfFirstPage = indexOfLastPage - dataPerPage;
        setCurrentData(data.slice(indexOfFirstPage,indexOfLastPage));
       
          // Logic for displaying page numbers
         const pageNumbers = [];
         for (let i = 1; i <= Math.ceil(data.length / dataPerPage); i++) {
           pageNumbers.push(i);
         }
         setPageNumber(pageNumbers);
         console.log(pageNumber)
    
      
        
      } 
  useEffect(()=>{
    const url = "https://asset-management-node.glitch.me/api/assets";
    try{
      axios.get(url).then((res)=>{
        setData(res.data);
        logic();
        setLoading(false);
        console.log(data);
        
      }).catch((err)=>{
        console.log(err);
      })
    }catch(err){
      console.log(err)
    }
  },[loading]);

 



     
  





    return (
        <div className="flex">
          <img className="cover" alt="cover" src={cover}/>
           
            <div className="cardbox">
              {loading ?<h1>loading..</h1>:
                  currentData.map((asset,key) => <Card id={asset._id} size={asset.filesize} 
                  type={asset.filetype} 
                   date ={asset.filedate}
                  url ={asset.fileurl}  key={key}name={asset.filename} />)
              }
            </div>
       
            <ul id="page-numbers">
              
              <br/>
              { pageNumber.map(number => {
       return (
         <li
           key={number}
           id={number}
           onClick={(e)=>{handleClick(e)}}
         >
           {number}
         </li>
       );
     })}
            </ul>
        </div>
      );
}
 
export default Home;
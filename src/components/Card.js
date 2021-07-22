import img from "../assets/img.png";
import video from "../assets/video.png";
import pdf from "../assets/pdf.png";
import file from "../assets/file.png"
import axios from 'axios';

const Card = ({ id ,name,size ,type,url,date}) => {
    let icon;
    if(type=="jpg"|| type == "png"){
        icon = img;
    }else if(type=="pdf"){
        icon = pdf;
    }else if(type == "mp3" || type == "mp4" || type == "wav"){
        icon = video;
    }else{
        icon = file;
    }

    // const delMovie =(id)=>{
    //     axios.delete(`https://glacial-headland-57223.herokuapp.com/api/movie/${id}`)
    //     .then(()=>console.log("deleted"));
    // }
    return (<div id="card">
        <img alt="poster" className="poster" src={icon} />
        <div>
            <p>{name}</p>
    
          
            <a target="_blank" href={url}> view </a>
        </div>


    </div>);
}

export default Card;
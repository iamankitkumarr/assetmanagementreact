import React from 'react'
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom'
import firebase from '../firebase';
import {useHistory} from 'react-router-dom';
export default function Navbar({user,setUser}) {
    let history = useHistory();
    const logout = ()=>{
        firebase.auth().signOut();
        setUser('');
    }
    const googleSigninHandler = (e)=>{
        e.preventDefault();
          var provider = new firebase.auth.GoogleAuthProvider();
          firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          //var credential = result.credential;
      
          // This gives you a Google Access Token. You can use it to access the Google API.
          //var token = credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          setUser(user);
          history.replace('/')
          // ...
        }).catch((error) => {
         console.log(error)
          // ...
        });
      }
    return (
        <nav id="navbar">
            <div className="container">
                <Link to="/">
                <img alt="logo" width={120} src={logo}/>   
                </Link>
           {user?( <div>
                <Link to="/upload">
                   Upload
                </Link>
                <div className="logout">
                         <Link to="/admin">
                         Admin
                         </Link>
                     </div>
                     <div className="logout">
                         <Link onClick={()=>logout()}>
                         logout
                         </Link>
                     </div>
                
            </div>):( <div>
                <Link onClick={(e)=>googleSigninHandler(e)}>
                  Signin
                </Link>
                
            </div>)}
           

            </div>
         
            

        </nav>
    )
}

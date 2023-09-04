import React, { useState } from "react";
import "./Join.css";
import Logo from "../../images/Logo.jpg"
import { Link } from "react-router-dom";

let user;

const sendUser = ()=>{
  user = document.getElementById("Joininput").value
  document.getElementById("Joininput").value =""
}

function Join() {
  const [name,setName] = useState("");
  return (
    <div className="Joipage">
      <div className="Joincontainer">   
      <img src={Logo} alt="Logo" />  
      <h1>Chat-App</h1>
      <input onChange={(e)=> setName(e.target.value)} placeholder="Enter Your Text" type="text" id="Joininput" />
     <Link onClick={(e)=>!name ?e.preventDefault():null } to='/chat'> <button  onClick={sendUser} className="joinbtn">Login </button> </Link>
      </div>
    </div>
  );
}

export default Join;
export {user}
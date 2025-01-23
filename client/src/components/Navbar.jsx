import React from 'react'
import pagelogo from "../assets/pptai_logo.jpeg"
import "../App.css"
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import "../media.css"

export default function Navbar({startLoader}) {
const location = useLocation()
const handleclick=()=>{
  startLoader()
}
const handleuserclick= async(e)=>{
  e.preventDefault();
  const url= `${import.meta.env.VITE_BACKEND_URL}/api/v1/userauth/getuser`
  const token=localStorage.getItem("auth-token")
  const responce= await fetch(url,{
    method:"GET",
    headers:{
      "auth-token":token,
      "Content-Type": "application/json"
    }
  }) 
  const userdata= await responce.json()
  console.log(userdata)

}
  return (
    <div>
      <div className="mian-box" style={{display:"flex",justifyContent:"space-between",margin:"6px 19px"}}>
        <div className="logo">
         <img src={pagelogo} alt="" style={{height:"60px",width:"60px",borderRadius:"50%",cursor:"pointer"}}/>
        </div>
        <div className="pages">
          <ul style={{display:"flex",listStyle:"none",gap:"20px"}}>
           <Link to="/" style={{textDecoration:"none"}}><li onClick={location.pathname==="/"?null:handleclick} className={`pagebtn ${location.pathname==="/"?"page-active":""}`}>Home</li></Link> 
           <Link to="/about" style={{textDecoration:"none"}}><li onClick={location.pathname==="/about"?null:handleclick} className={`pagebtn ${location.pathname==="/about"?"page-active":""}`}>About</li></Link> 
          </ul>
        </div>
        {localStorage.getItem("auth-token")?<div><button style={{height:"60px",width:"60px",borderRadius:"50%"}} onClick={handleuserclick}>profile</button></div>:<div className="all-button" style={{display:"flex", gap:"4px",justifyContent:"center"}}>
        <Link to="/singup">  <button onClick={location.pathname==="/singup"?null:handleclick} className='loginbtn' style={{ height: "40px", width: "100px", borderRadius: "10px", outline: "none",border:"none", backgroundColor: "white", cursor: "pointer", color: "#680ce7" }}>Singup</button></Link>
        <Link to="/login">  <button onClick={location.pathname==="/login"?null:handleclick} className='loginbtn' style={{ height: "40px", width: "100px", borderRadius: "10px", outline: "none",border:"none", backgroundColor: "white", cursor: "pointer", color: "#680ce7" }}>Login</button></Link>
        </div>}
      </div>
    </div>
  )
}

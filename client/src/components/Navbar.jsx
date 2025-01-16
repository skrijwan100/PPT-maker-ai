import React from 'react'
import pagelogo from "../assets/pptai_logo.jpeg"
import "../App.css"
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import "../media.css"

export default function Navbar() {
const location = useLocation()
  return (
    <div>
      <div className="mian-box" style={{display:"flex",justifyContent:"space-between",margin:"6px 19px"}}>
        <div className="logo">
         <img src={pagelogo} alt="" style={{height:"60px",width:"60px",borderRadius:"50%",cursor:"pointer"}}/>
        </div>
        <div className="pages">
          <ul style={{display:"flex",listStyle:"none",gap:"20px"}}>
           <Link to="/" style={{textDecoration:"none"}}><li className={`pagebtn ${location.pathname==="/"?"page-active":""}`}>Home</li></Link> 
           <Link to="/about" style={{textDecoration:"none"}}><li className={`pagebtn ${location.pathname==="/about"?"page-active":""}`}>About</li></Link> 
          </ul>
        </div>
        <div className="all-button" style={{display:"flex", gap:"4px",justifyContent:"center"}}>
          <button className='loginbtn' style={{ height: "40px", width: "100px", borderRadius: "10px", outline: "none",border:"none", backgroundColor: "white", cursor: "pointer", color: "#680ce7" }}>Singup</button>
          <button className='loginbtn' style={{ height: "40px", width: "100px", borderRadius: "10px", outline: "none",border:"none", backgroundColor: "white", cursor: "pointer", color: "#680ce7" }}>Login</button>
        </div>
      </div>
    </div>
  )
}
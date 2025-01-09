import React from 'react'
import pagelogo from "../assets/pptai_logo.jpeg"
import "../App.css"
export default function Navbar() {
  return (
    <div>
      <div className="mian-box" style={{display:"flex",justifyContent:"space-between",margin:"6px 19px"}}>
        <div className="logo">
         <img src={pagelogo} alt="" style={{height:"60px",width:"60px",borderRadius:"50%",cursor:"pointer"}}/>
        </div>
        <div className="button">
          <button className='loginbtn' style={{width:"88px",height:"38px",border:"none",outline:"none",backgroundColor:"greenyellow",borderRadius:"9px",cursor:"pointer"}}>Login</button>
        </div>
      </div>
    </div>
  )
}

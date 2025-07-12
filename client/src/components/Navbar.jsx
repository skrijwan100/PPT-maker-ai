import React, { useState, useEffect, useContext } from 'react'
import pagelogo from "../assets/pptai_logo.jpeg"
import "../App.css"
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import "../media.css"
import loder from "../assets/loder.gif"
import user from "../assets/user.gif"
import hambarger from "../assets/hambargar.png"
import close from "../assets/close.png"
import { userprofileContext } from "../context/userpicrender"
export default function Navbar({ startLoader, showuser }) {
  const location = useLocation()
  const [menu, setmenu] = useState(true)
  const [userloder, setuserloder] = useState(true)
  const [userpic, setuserpic] = useState({})
  const [pic, setpic] = useState(false)
  const { userprofile, profile } = useContext(userprofileContext)
  const fecthuserpic = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v3/userpic/sendfrontend`
    const token = localStorage.getItem("auth-token")
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      }

    })
    const data = await res.json()
    console.log(data)
    setuserpic(data)
    setpic(true)
    userprofile()

  }
  useEffect(() => {

    fecthuserpic()
    console.log(profile)
  }, [])

  const handlemaue = () => {
    setmenu(false)
  }
  const handleclose = () => {
    setmenu(true)
  }
  const handleclick = () => {
    startLoader()
  }
  const handleuserclick = async (e) => {
    e.preventDefault();
    setuserloder(false)
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/userauth/getuser`
    const token = localStorage.getItem("auth-token")
    const responce = await fetch(url, {
      method: "GET",
      headers: {
        "auth-token": token,
        "Content-Type": "application/json"
      }
    })
    const userdata = await responce.json()
    showuser(userdata.message.name, userdata.message.email, userdata.message.profassion)
    setuserloder(true)
    // console.log(userdata)

  }
  return (
    <div>
      <div className="mian-box" style={{ display: "flex", justifyContent: "space-between", margin: "6px 19px" }}>
        <div className="logo">
          <img className='logoimg' src={pagelogo} alt="" style={{ height: "60px", width: "60px", borderRadius: "50%", cursor: "pointer" }} />
        </div>
        <div className={menu ? "hamhide" : "hamshow"} style={{ display: "none", height: "235px", width: "170px", position: "fixed", left: "54vw", backdropFilter: "blur(30px)", borderRadius: "10px", zIndex: "2", border: "1px solid #056e87" }}>
          <div style={{ display: "flex", justifyContent: "end" }}>

            <img onClick={handleclose} style={{ height: "43px", width: "43px" }} src={close} alt="" />
          </div>
          <ul style={{ listStyle: "none", gap: "5px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Link to="/" style={{ textDecoration: "none" }}><li onClick={location.pathname === "/" ? null : handleclick} className={`pagebtn ${location.pathname === "/" ? "page-active" : ""}`}>Home</li></Link>
            <Link to="/about" style={{ textDecoration: "none" }}><li onClick={location.pathname === "/about" ? null : handleclick} className={`pagebtn ${location.pathname === "/about" ? "page-active" : ""}`}>Feedback</li></Link>
            <Link to="/picupload" style={{ textDecoration: "none" }}><li onClick={location.pathname === "/picupload" ? null : handleclick} className={`pagebtn ${location.pathname === "/picupload" ? "page-active" : ""}`}>Uploadpic</li></Link>
          </ul>
          {localStorage.getItem("auth-token") ? userloder ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "15px" }}><div onClick={handleuserclick} style={{ height: "42px", width: "42px", borderRadius: "50%", border: "2px solid #680ce7", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>{pic && userpic.picurl ? (
          <div >
             <img style={{ height: "60px", width: "60px", borderRadius: "50%", cursor: "pointer",objectFit:"cover" }} src={`${userpic.picurl}`} alt="User Pic" />
          </div>
        ) : (
          <p style={{ color: "white", fontSize: "10px" }}>No image available</p>
        )}</div></div> : <div style={{ textAlign: "center" }}><img src={loder} style={{ width: '50px', height: '50px' }} alt="" /></div> : <div className="" style={{ display: "flex", gap: "4px", justifyContent: "space-evenly", marginTop: "9px" }}>
            <Link to="/singup">  <button onClick={location.pathname === "/singup" ? null : handleclick} className='loginbtn' style={{ height: "40px", width: "75px", borderRadius: "10px", outline: "none", border: "none", backgroundColor: "white", cursor: "pointer", color: "#680ce7" }}>Singup</button></Link>
            <Link to="/login">  <button onClick={location.pathname === "/login" ? null : handleclick} className='loginbtn' style={{ height: "40px", width: "75px", borderRadius: "10px", outline: "none", border: "none", backgroundColor: "white", cursor: "pointer", color: "#680ce7" }}>Login</button></Link>
          </div>}

        </div>
        <div className={menu ? "hamshow" : "hamhide"} style={{ display: "none" }} ><img onClick={handlemaue} style={{ height: "43px", width: "43px" }} src={hambarger} alt="" /></div>
        <div className="pages">
          <ul style={{ display: "flex", listStyle: "none", gap: "20px" }}>
            <Link to="/" style={{ textDecoration: "none" }}><li onClick={location.pathname === "/" ? null : handleclick} className={`pagebtn ${location.pathname === "/" ? "page-active" : ""}`}>Home</li></Link>
            <Link to="/about" style={{ textDecoration: "none" }}><li onClick={location.pathname === "/about" ? null : handleclick} className={`pagebtn ${location.pathname === "/about" ? "page-active" : ""}`}>Feedback</li></Link>
            <Link to="/picupload" style={{ textDecoration: "none" }}><li onClick={location.pathname === "/picupload" ? null : handleclick} className={`pagebtn ${location.pathname === "/picupload" ? "page-active" : ""}`}>Uploadpic</li></Link>
          </ul>
        </div>
        {localStorage.getItem("auth-token") ? <div className="all-button" onClick={handleuserclick} style={{ height: "42px", width: "42px", borderRadius: "50%", border: "2px solid #680ce7", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>  {pic && userpic.picurl ? (
          <div style={{marginTop:"15px"}}>
            {!userloder ? <div style={{marginTop:"15px"}}><img src={loder} style={{ width: '50px', height: '50px' }} alt="" /></div> : <img style={{ height: "60px", width: "60px", borderRadius: "50%", cursor: "pointer",objectFit:"cover" }} src={`${userpic.picurl}`} alt="User Pic" />}
          </div>
        ) : (
          <p style={{ color: "white", fontSize: "10px" }}>No image available</p>
        )}</div> : <div className="all-button" style={{ display: "flex", gap: "4px", justifyContent: "center" }}>
          <Link to="/singup">  <button onClick={location.pathname === "/singup" ? null : handleclick} className='loginbtn' style={{ height: "40px", width: "100px", borderRadius: "10px", outline: "none", border: "none", backgroundColor: "white", cursor: "pointer", color: "#680ce7" }}>Singup</button></Link>
          <Link to="/login">  <button onClick={location.pathname === "/login" ? null : handleclick} className='loginbtn' style={{ height: "40px", width: "100px", borderRadius: "10px", outline: "none", border: "none", backgroundColor: "white", cursor: "pointer", color: "#680ce7" }}>Login</button></Link>
        </div>}
      </div>
    </div>
  )
}

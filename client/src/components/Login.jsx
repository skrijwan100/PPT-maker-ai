import React from 'react'
import { useState } from 'react'
import lodergif from "../assets/loder1.gif"
import { useNavigate } from 'react-router'

export default function Login({ showAlert }) {
  const [credentials, setcredentials] = useState({ email: "", password: "" })
  const [loder, setloder] = useState(false)
  const naviget= useNavigate()
  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handlesubmit = async (e) => {
    e.preventDefault();
    setloder(true)
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/userauth/login`
    const responce = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    })
    const data = await responce.json()
    setloder(false)
    console.log(data)
    if (data.error === "You don't have any account in this email.") {
      return showAlert("You don't have any account", "error")

    }
    if (data.error === "Incorrect password") {
      return showAlert("Incorrect password", "error")

    }
    naviget("/")
    localStorage.setItem("auth-token",data.authtoken)
    showAlert("Login successfully","success")
    


  }
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="login wrap">
        <div className="h1">Login</div>
        <form onSubmit={handlesubmit}>
          <input onChange={onchange} value={credentials.email} pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" placeholder="Email" id="email" name="email" type="text" />
          <input onChange={onchange} value={credentials.password} placeholder="Password" id="password" name="password" type="password" />
          {loder ? <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

            <img style={{ height: "84px" }} src={lodergif} alt="this is loder" />
          </div> : <input value="Login" className="btn" type="submit" />}
        </form>

      </div>
    </div>
  )
}

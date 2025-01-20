import React, { useState } from 'react'

export default function Singup() {
  const [credentials, setcredentials] = useState({ name: "", email: "", profassion: "", password: "" })
  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handlesubmit = async (e) => {
    e.preventDefault();
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/userauth/register`
    const responce = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, profassion: credentials.profassion })

    })
    const data = await responce.json()
    console.log(data)

  }
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="login singup wrap">
        <div className="h1">Singup</div>
        <input onChange={onchange} placeholder="Name" id="password" name="name" type="text" value={credentials.name} />
        <input onChange={onchange} pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" placeholder="Email" id="email" name="email" type="text" value={credentials.email} />
        <input onChange={onchange} placeholder="Enter your profassion" id="password" name="profassion" type="text" value={credentials.profassion} />
        <input onChange={onchange} placeholder="Password" id="password" name="password" type="password" value={credentials.password} />
        <input onClick={handlesubmit} value="Singup" className="btn" type="submit" />
      </div>
    </div>
  )
}

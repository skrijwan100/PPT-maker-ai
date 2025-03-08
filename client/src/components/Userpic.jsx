import React, { useEffect, useState } from 'react'

export default function Userpic() {
    const [userpic, setuserpic] = useState({})
    const [pic, setpic] = useState(false)
    useEffect(() => {
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

        }
        fecthuserpic()
    }, [])
    return (
        <div>
            <h1 style={{ color: "white" }}>Here we see the user pic</h1>
            {pic && userpic.picurl ? (
                <div>
                    <img  style={{height:"100px",width:"100px",borderRadius:"50%"}} src={`${import.meta.env.VITE_BACKEND_URL}${userpic.picurl}`} alt="User Pic" />
                </div>
            ) : (
                <p style={{ color: "white" }}>No image available</p>
            )}
        </div>
    )
}

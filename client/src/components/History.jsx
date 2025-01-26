import React, { useEffect, useState } from 'react'

export default function History() {
    const [userhistory,setuserhistory]=useState({})
    useEffect( () => {
        const fecthhistory=async()=>{
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/v2/userhistory/viewhistory`
            const token = localStorage.getItem("auth-token")
            const responce = await fetch(url, {
                method: "GET",
                headers: {
                    "auth-token": token,
                    "Content-Type": "application/json"
                }
            })
            const data = await responce.json()
            console.log(data)
            setuserhistory(data.allhistory[0])
            

        }
        fecthhistory()

    }, [])
    return (
        <div>
            <h1>This is history page</h1>
           {/* {console.log(userhistory)} */}
        </div>
    )
}

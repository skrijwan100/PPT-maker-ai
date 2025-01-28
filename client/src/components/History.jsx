import React, { useEffect, useState } from 'react'
import ReactMarkdown from "react-markdown";

export default function History() {
    const [userhistory, setuserhistory] = useState([])

    useEffect(() => {
        const fecthhistory = async () => {
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
            setuserhistory(data.allhistory)


        }
        fecthhistory()

    }, [])
    return (
        <>
            <div style={{ color: "white" }}>
                <h1 style={{ textAlign: "center", fontFamily: "Rubik Vinyl", color: "#680ce7", fontSize: "60px" }}>History</h1>
                {userhistory.map((data) => (

                    <div style={{display:"flex",flexDirection:"column",gap:"17px",marginBottom:"10px"}}>
                        <div>
                            <h1>Topic: {data.topicname}</h1>
                            

                        </div>
                        <div>
                           <h2>Slide number: {data.slidenumber}</h2>

                        </div>
                        <div>
                            <h3>Responce:</h3>
                          <ReactMarkdown>{data.responce}
                          </ReactMarkdown>  
                        </div>

                    </div>


                ))}
                {console.log(userhistory)}
            </div>
        </>
    )
}

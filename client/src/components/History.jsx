import React, { useEffect, useState } from 'react'
import ReactMarkdown from "react-markdown";
import { useNavigate } from 'react-router-dom';

export default function History({showAlert}) {
    const [userhistory, setuserhistory] = useState([])
    const naviget= useNavigate()

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
            // console.log(data)
            setuserhistory(data.allhistory)


        }
        fecthhistory()

    }, [])
    const handledelte= async(e,id)=>{
        e.preventDefault();
        const url=`${import.meta.env.VITE_BACKEND_URL}/api/v2/userhistory/deletehistory/${id}`
        const token= localStorage.getItem("auth-token")
        const responce= await fetch(url,{
            method:"DELETE",
            headers: {
                "auth-token": token,
                "Content-Type": "application/json"
            }
        })

        const data= await responce.json()
        if(data.message==="delete done"){
            showAlert("delete done","success")
            naviget("/home")
            setTimeout(() => {
                naviget("/history")
            }, 100);
        }
    }
    return (
        <>
            <div style={{ color: "white", marginLeft:"10px" }}>
                <h1 style={{ textAlign: "center", fontFamily: "Rubik Vinyl", color: "#680ce7", fontSize: "60px" }}>History</h1>
                {!userhistory?<div style={{fontSize:"30px",color:"#680ce7", textAlign:"center",fontFamily:"monospace"}}>No history to show.</div>:userhistory.map((data,index) => (

                    <div key={data._id} style={{display:"flex",flexDirection:"column",gap:"17px",marginBottom:"17px"}}>
                        <div>
                           <h1 style={{color:"yellow"}}>{++index}.Topic: {data.topicname}</h1>
                            

                        </div>
                        <div>
                           <h2 style={{color:"#680ce7"}}>Slide number: {data.slidenumber}</h2>

                        </div>
                        <div>
                            <h2 style={{color:"#ff3155",marginBottom:"10px"}}>Responce:</h2>
                            <div style={{fontSize:"20px"}}>
                            <ReactMarkdown>{data.responce}</ReactMarkdown> 
                            </div>
                   
                        </div>
                        <div className="button">
                            <button onClick={(e)=>handledelte(e,data._id)} className='deltetbtn'>Delete history</button>
                        </div>

                    </div>


                ))} 
            </div>
        </>
    )
}

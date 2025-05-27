import React, { useEffect, useState } from 'react'
import ReactMarkdown from "react-markdown";
import { useNavigate } from 'react-router-dom';

export default function History({ showAlert }) {
  const [userhistory, setuserhistory] = useState([])
  const naviget = useNavigate()

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
  const handledelte = async (e, id) => {
    e.preventDefault();
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v2/userhistory/deletehistory/${id}`
    const token = localStorage.getItem("auth-token")
    const responce = await fetch(url, {
      method: "DELETE",
      headers: {
        "auth-token": token,
        "Content-Type": "application/json"
      }
    })

    const data = await responce.json()
    if (data.message === "delete done") {
      showAlert("delete done", "success")
      naviget("/home")
      setTimeout(() => {
        naviget("/history")
      }, 100);
    }
  }
  return (
    <>
        <h1 className="page-title">History</h1>
      <div className="container-fluid">

        {!userhistory ?
          <div className="no-history">No history to show.</div>
          :
          userhistory.map((data, index) => (
            <div key={data._id} className="history-card">
              <div>
                <h1 className="topic-title">{++index}. Topic: {data.topicname}</h1>
              </div>

              <div>
                <h2 className="slide-number">Slide number: {data.slidenumber}</h2>
              </div>

              <div>
                <h2 className="response-title">Response:</h2>
                <div className="response-content">
                  <ReactMarkdown>{data.responce}</ReactMarkdown>
                </div>
              </div>

              <div className="button">
                <button
                  onClick={(e) => handledelte(e, data._id)}
                  className="delete-btn"
                >Delete history</button>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

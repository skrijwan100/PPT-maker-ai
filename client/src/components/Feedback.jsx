import React, { useState } from 'react'
import lodergif from "../assets/loder1.gif"
export default function Feedback({ showAlert }) {
    const [feedbackdetiles, setFeedbackdetiles] = useState({ username: "", email: "", message: "" })
    const [loder,setLoder]=useState(false)
    const onchange = (e) => {
        setFeedbackdetiles({ ...Feedback, [e.target.name]: e.target.value })
    }
    const handlefeedback = async (e) => {
        e.preventDefault();
        setLoder(true)
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/v4/feedback/adduserfeedback`
        const responce = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: feedbackdetiles.username, email: feedbackdetiles.email, message: feedbackdetiles.message })
        })
        const data = await responce.json()
        console.log(data)
        if (data.status) {
            setFeedbackdetiles({ username: "", email: "", message: "" })
            setLoder(false)
            return showAlert("Your Feedback is submitted", "success")
        }
        setLoder(false)
        return showAlert("Server error", "error")

    }
    return (
        <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div className="login wrap">
                    <h2 className='h1' style={{ textAlign: "center", marginBottom: "20px", color: "#680ce7" }}>Feedback Form</h2>
                    <form onSubmit={handlefeedback} >
                        <input
                            onChange={onchange}
                            type="text"
                            name='username'
                            value={feedbackdetiles.username}
                            placeholder="Your Name" required />
                        <input pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" value={feedbackdetiles.email} onChange={onchange} placeholder="Your Email" id="email" name="email" type="text" required />
                        <textarea
                            placeholder="Describe your experience or issue"
                            name='message' value={feedbackdetiles.message} onChange={onchange}
                            style={{ backgroundColor: "#3c3c3c", border: "none", outline: "none", color: "white", marginTop: "30px", height: "80px", width: "280px", resize: "none", padding: "15px", borderRadius: "20px" }}
                            required />
                        {loder ? <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

                            <img style={{ height: "84px" }} src={lodergif} alt="this is loder" />
                        </div> : <input value="Submit Feedback" className="btn" type="submit" />}
                    </form>

                </div>
            </div>
        </>
    )
}

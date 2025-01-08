import React, { useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai"
import loder from "./assets/loder.gif"
export default function App() {
  const [answer,setanswer]=useState()
  const [Topic,setTopic]=useState({tname:"",slidenumber:""})
  const [showloder,setshowloder]=useState(false)
  const onchange=(e)=>{
    setTopic({...Topic,[e.target.name]:e.target.value})
  }
  const handelclick = async () => {
    setshowloder(true)
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", role :"I am a PowerPoint presentation creator AI designed to assist in generating structured slide content for your website. My responses will always follow a clear and professional format, with content segmented into slides. Each slide will have a title and body, and optional elements like bullet points, images, or charts can be specified upon request"});

    const prompt = `${Topic.tname} create ${Topic.slidenumber} slide on this topic for my ppt` ;

    const result = await model.generateContent(prompt);
    setshowloder(false)
    setanswer(result.response.text())
  }

  return (
    <div>
      <div className="top-box" style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"10px",marginTop:"20px"}}>
      <input className='input-box' style={{ padding:"10px", height:"30px",width:"290px",borderRadius:"10px",border:"none",outline:"none",backgroundColor:"#e8f0fe",color:"black"}} name='tname' type="text" placeholder='Enter the topic ' value={Topic.tname} onChange={onchange} />
      <input name='slidenumber'  style={{ padding:"10px", height:"30px",width:"290px",borderRadius:"10px",border:"none",outline:"none",backgroundColor:"#e8f0fe",color:"black"}} value={Topic.slidenumber} onChange={onchange}  type="number" placeholder='How many slide you wnat ' />
      <button onClick={handelclick} disabled={Topic.tname===""?true:false} style={{ height: "40px", width: "100px",borderRadius:"10px",outline:"none",border:"none",backgroundColor:"greenyellow" ,cursor:"pointer"}}>Generate</button>
      </div>
      <div className='all-text' style={{textAlign:"center",}}>
       {showloder?<img src={loder} alt="" />:answer}
      </div>
    </div>
  )
}

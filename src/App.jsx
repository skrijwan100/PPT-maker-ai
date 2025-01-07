import React, { useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai"
export default function App() {
  const [answer,setanswer]=useState()
  const [Topic,setTopic]=useState({tname:""})
  const onchange=(e)=>{
    setTopic({...Topic,[e.target.name]:e.target.value})
  }
  const handelclick = async () => {
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = Topic.tname;

    const result = await model.generateContent(prompt);;
    setanswer(result.response.text())
  }

  return (
    <div>
      <input name='tname' type="text" placeholder='Enter the topic ' value={Topic.tname} onChange={onchange} />
      <button onClick={handelclick} style={{ height: "100px", width: "100px" }}>Generate</button>
      {answer}
    </div>
  )
}

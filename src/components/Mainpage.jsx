import React, { useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai"
import loder from "../assets/loder.gif"
import ReactMarkdown from "react-markdown";
import "../App.css"
import pptxgen from "pptxgenjs";
export default function App() {
  const [answer, setanswer] = useState()
  const [Topic, setTopic] = useState({ tname: "", slidenumber: "" })
  const [showloder, setshowloder] = useState(false)
  const handlepptgen = () => {
    let pptx = new pptxgen();

     // 2. Fetch or Generate AI content (Placeholder for now)
     const slideContent = [
      { title: "Slide 1", text: "Welcome to AI-powered PPT Maker!" },
      { title: "Slide 2", text: "Here's how it works:\n1. React UI\n2. AI-generated text\n3. Dynamic PPT creation" },
    ];
  
    // 3. Add Slides and Content
    slideContent.forEach((content) => {
      const slide = pptx.addSlide();
      slide.background = { color: "FF3399", transparency: 50 }
      slide.addText(content.title, { x: 0.5, y: 0.5, fontSize: 26, bold: true, align: pptx.AlignH.center,});
      slide.addText(content.text, { x: 0.5, y: 1, fontSize: 14 });
    });

    // 4. Export PPT File
    
    pptx.writeFile({ fileName: "AI_PPT_Maker.pptx" });
  }
  const onchange = (e) => {
    setTopic({ ...Topic, [e.target.name]: e.target.value })
  }
  const handelclick = async () => {
    setshowloder(true)
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", role: "I am a PowerPoint presentation creator AI designed to assist in generating structured slide content for your website. My responses will always follow a clear and professional format, with content segmented into slides. Each slide will have a title and body, and optional elements like bullet points, images, or charts can be specified upon request" });

    const prompt = `${Topic.tname} create ${Topic.slidenumber} slide on this topic for my ppt and for every slide provide a img url`;

    const result = await model.generateContent(prompt);
    setshowloder(false)
    setanswer(result.response.text())
  }

  return (
    <div>
      <div className="header-box">
        <p style={{ color: "#680ce7", fontSize: "57px", fontWeight: "800", fontFamily: "Rubik Vinyl", textAlign: "center" }}>Let's make your PPT now 🔥</p>
      </div>
      <div className="top-box" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "10px" }}>
        <div className="inner-box" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "20px", marginTop: "20px" }}>
          <input className='input-box' style={{ padding: "10px", height: "30px", width: "290px", borderRadius: "10px", border: "2px solid white", outline: "none", backgroundColor: "#853aed", color: "black" }} name='tname' type="text" placeholder='Enter the topic ' value={Topic.tname} onChange={onchange} />
          <input className='input-box' name='slidenumber' style={{ padding: "10px", height: "30px", width: "290px", borderRadius: "10px", outline: "none", backgroundColor: "#853aed", color: "black", border: "2px solid white" }} value={Topic.slidenumber} onChange={onchange} type="number" placeholder='How many slide you wnat ' />
          <button className='GenerateBtn' onClick={handelclick} disabled={Topic.tname === "" ? true : false} style={{ height: "40px", width: "100px", borderRadius: "10px", outline: "none", border: "none", backgroundColor: "#680ce7", cursor: "pointer", color: "white" }}>Generate</button>
        </div>
      </div>



      <div className="out-text-box" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className='all-text' style={{ color: "white", marginTop: "20px", width: "90vw" }}>
          {showloder ? <div style={{ textAlign: "center" }}><img src={loder} alt="" /></div> : <div style={{ margin: "20px 0px", fontSize: "20px" }}><ReactMarkdown>{answer}</ReactMarkdown></div>}

        </div>
      </div>
      {answer ? <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <button onClick={handlepptgen} style={{ height: "50px", width: "100px" }}>Genatare ppt</button>

      </div> : ""}

    </div>
  )
}

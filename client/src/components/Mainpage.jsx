import React, { useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai"
import loder from "../assets/loder.gif"
import ReactMarkdown from "react-markdown";
import convertCssColorNameToHex from 'convert-css-color-name-to-hex';
import "../App.css"
import pptxgen from "pptxgenjs";
export default function App() {
  const [answer, setanswer] = useState()
  const [Topic, setTopic] = useState({ tname: "", slidenumber: "",pptcolor:"" , pptname:""})
  const [showloder, setshowloder] = useState(false)
  
  const handlepptgen = () => {
    // 2. Fetch or Generate AI content (Placeholder for now)
    const processGeminiResponse = (response) => {
      // Split response into slides
      const slides = response.split("**Slide ").slice(1);
    
      // Map each slide into the desired format
      const slideContent = slides.map((slide, index) => {
        // Extract title from '**Title:**' or first line after slide header
        const titleMatch = slide.match(/\*\*Title:\*\s*(.+)/) || slide.match(/^(.*?:)/m);
        const title = titleMatch ? titleMatch[1].trim() : `Slide ${index + 1}`;
    
        // Extract remaining content as text
        const text = slide.replace(/\*\*Title:\*\s*.+\n ?/g, "").trim()
    
        return { title, text };
      });
    
      return slideContent;
    };
    const slideContent = processGeminiResponse(answer);
  
  console.log(slideContent);
    let pptx = new pptxgen();

  
    // 3. Add Slides and Content
    const ppthexcolor=convertCssColorNameToHex(Topic.pptcolor);

    slideContent.forEach((content) => {
      const slide = pptx.addSlide();
      slide.background = { color:ppthexcolor , transparency: 50 }
      slide.addText(content.title, { x: 0.5, y: 0.5, fontSize: 26, bold: true, align: pptx.AlignH.center,});
      slide.addText(content.text, { x: 1, y: 3.2 ,fontSize: 14 });
    });

    // 4. Export PPT File
    
    pptx.writeFile({ fileName: Topic.pptname });
  }
  const onchange = (e) => {
    setTopic({ ...Topic, [e.target.name]: e.target.value })
  }
  const handelclick = async () => {
    setshowloder(true)
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", role: "I am a PowerPoint presentation creator AI designed to assist in generating structured slide content for your website. My responses will always follow a clear and professional format, with content segmented into slides. Each slide will have a title and body, and optional elements like bullet points, images, or charts can be specified upon request" });

    const prompt = `${Topic.tname} create ${Topic.slidenumber} slide on this topic for my ppt and give response in a way so each slide has a clear title and structured content.`;

    const result = await model.generateContent(prompt);
    setshowloder(false)
    const responseText = await result.response.text(); 
    setanswer(responseText)

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
      {answer ? <div style={{ display: "flex", alignItems: "center", justifyContent: "center",flexDirection:"column",gap:"10px" }}>
        <input list='color-list' className='input-box' style={{width:"200px",height:"35px",borderRadius:"10px",border:"2px solid white",outline:"none",padding:"6px",backgroundColor:"#853aed"}} type="text" name="pptcolor" id="" placeholder='Enter your ppt background color' value={Topic.pptcolor} onChange={onchange}  />
        <datalist id="color-list">
        <option value="red"></option>
        <option value="yellow"></option>
        <option value="blue"></option>
        <option value="green"></option>
        <option value="aqua"></option>
        <option value="violet"></option>
        <option value="seashell"></option>
        <option value="mediumpurple"></option>
        <option value="lightsteelblue"></option>
        </datalist>
        <input className='input-box' style={{width:"200px",height:"35px",borderRadius:"10px",border:"2px solid white",outline:"none",padding:"6px",backgroundColor:"#853aed"}} type="text" name="pptname"  placeholder='Enter your ppt file name' value={Topic.pptname} onChange={onchange}  />
        <button className='GeneratepptBtn' onClick={handlepptgen} style={{ height: "40px", width: "100px", borderRadius: "10px", outline: "none", border: "none", backgroundColor: "white", cursor: "pointer", color: "#680ce7" }}>Make ppt</button>

      </div> : ""}

    </div>
  )
}
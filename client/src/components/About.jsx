import React from 'react'
import Feedback from './Feedback'

export default function About({showAlert}) {
  return (
    <div>
      <Feedback showAlert={showAlert} />
      {/* <p style={{fontSize:"30px",color:"white",fontFamily:"Jersey 15",textAlign:"center"}}>

     This web app use Gemini ai. This is now not ready yet. some useful and new update are comeing soon. If anyone want  contribute go to the repo.
      </p> */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"30px"}}>
     <a href="https://github.com/skrijwan100/PPT-maker-ai" target='_blank'><button className='loginbtn' style={{ height: "40px", width: "100px", borderRadius: "10px", outline: "none",border:"none", backgroundColor: "white", cursor: "pointer", color: "#680ce7" }}>Source code</button></a>
      </div>
    </div>
  )
}

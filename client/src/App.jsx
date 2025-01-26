import React from 'react'
import Navbar from './components/Navbar'
import Mainpage from './components/Mainpage'
import {
  BrowserRouter ,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from 'react';
import About from './components/About';
import Footer from './components/Footer';
import "./media.css"
import Login from './components/Login';
import Singup from './components/Singup';
import Loader from './components/Loder';
import Alert from './components/Alert';
import Usermodal from "./components/Usermodal"
import History from './components/History';
export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [alert,setalert]=useState(null)
  const [usermodal,setusermodal]=useState(null)
  const startLoader = () => {
    setProgress(0);
    setIsLoading(true);
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 50);
  };
  const showAlert = (msg, ty) => {
    setalert({
      msg: msg,
      ty: ty
    })
  };
  const showuser=(name,email,profassion)=>{

    setusermodal({
      name:name,
      email:email,
      profassion:profassion
    })
  }

  return (
    <div>
        <BrowserRouter>
        <Loader isLoading={isLoading} progress={progress}  />
      <Alert alert={alert}/>
      <Navbar startLoader={startLoader} showuser={showuser}/>
      <Usermodal usermodal={usermodal} startLoader={startLoader} />
    <Routes>
      <Route path='/' element={<Mainpage showuser={showuser}/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/login' element={<Login showAlert={showAlert}/>} />
      <Route path='/singup' element={<Singup showAlert={showAlert}/>} />
      <Route path='/history' element={<History showAlert={showAlert}/>} />
    </Routes>
    <Footer/>
    </BrowserRouter>
    </div>
  )
}

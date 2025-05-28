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
import Uploadfile from './components/Uploadfile';
import Userpic from './components/Userpic';
import {userprofileContext} from "./context/userpicrender"
export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [alert,setalert]=useState(null)
  const [usermodal,setusermodal]=useState(null)
  const [profile,setProfile]=useState(false)
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
  const userprofile=()=>{
    // setProfile(true)
    // setTimeout(()=>{
    //   setProfile(false)
    // },200)
  }

  return (
    <div>
      <userprofileContext.Provider value={{userprofile,profile,setProfile}}>

        <BrowserRouter>
        <Loader isLoading={isLoading} progress={progress}  />
      <Alert alert={alert}/>
      <Navbar startLoader={startLoader} showuser={showuser}/>
      <Usermodal usermodal={usermodal} startLoader={startLoader} />
    <Routes>
      <Route path='/' element={<Mainpage showuser={showuser} showAlert={showAlert} startLoader={startLoader}  />} />
      <Route path='/about' element={<About showAlert={showAlert}/>} />
      <Route path='/login' element={<Login showAlert={showAlert}/>} />
      <Route path='/singup' element={<Singup showAlert={showAlert}/>} />
      <Route path='/history' element={<History showAlert={showAlert}/>} />
      <Route path='/picupload' element={<Uploadfile showAlert={showAlert}/>} />
      <Route path='/userpic' element={<Userpic showAlert={showAlert}/>} />
    </Routes>
    <Footer/>
    </BrowserRouter>
      </userprofileContext.Provider>
    </div>
  )
}

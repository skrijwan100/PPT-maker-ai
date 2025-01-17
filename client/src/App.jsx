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
export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
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
  return (
    <div>
        <BrowserRouter>
        <Loader isLoading={isLoading} progress={progress}  />
      <Navbar startLoader={startLoader}/>
    <Routes>
      <Route path='/' element={<Mainpage/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/singup' element={<Singup/>} />
    </Routes>
    <Footer/>
    </BrowserRouter>
    </div>
  )
}

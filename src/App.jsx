import React from 'react'
import Navbar from './components/Navbar'
import Mainpage from './components/Mainpage'
import {
  BrowserRouter ,
  Routes,
  Route,
} from "react-router-dom";
import About from './components/About';
export default function App() {
  return (
    <div>
        <BrowserRouter>
      <Navbar/>
    <Routes>
      <Route path='/' element={<Mainpage/>} />
      <Route path='/about' element={<About/>} />
    </Routes>
    </BrowserRouter>
    </div>
  )
}

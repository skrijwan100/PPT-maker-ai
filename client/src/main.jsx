import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProfileContextProvider from './context/userpicrender.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProfileContextProvider>
    <App />
    </ProfileContextProvider>
  </StrictMode>
)

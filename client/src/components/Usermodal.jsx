import  { useEffect } from 'react'
import Swal from 'sweetalert2';
import "../App.css"
import { useNavigate } from 'react-router-dom';
export default function Modal(props) {
  const naviget=useNavigate()
    const logout=()=>{
        localStorage.removeItem("auth-token")
        location.reload()
    }
    const userhistory=async()=>{
      props.startLoader()   
      naviget("/history")
    }
  return (
    useEffect(()=>{
        if(props.usermodal){
            Swal.fire({
                position: "top-end",
                title:`Hi ${props.usermodal.name}` ,
                html: `
                  <div style="text-align: center; font-size: 1.1em;">
                    <p style=" margin-top: 20px;"><strong>Email:</strong> ${props.usermodal.email}</p>
                    <p style=" margin-top: 20px;"><strong>You are a:</strong> ${props.usermodal.profassion}</p>
                    <button id="logout-btn" class='logoutbtn'>Logout</button>
                    <button id="history-btn" class='historybtn'>History</button>
                  </div>
                `,
                showCloseButton: true,
                confirmButtonText: 'close',
                customClass: {
                  popup: 'animated fadeInDown', // Add animation if desired
                },
                didOpen: () => {
                    // Add event listener to the logout button
                    document.getElementById('logout-btn').addEventListener('click', logout);
                    document.getElementById('history-btn').addEventListener('click', userhistory);
                },
              });
        }

    }, [props.usermodal])
  )
  return null;
}

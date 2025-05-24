import React from 'react'
import { useState, useContext } from 'react';
import axios from "axios"
import loder from "../assets/loder.gif"
// import { useProfile } from '../context/userpicrender';
// import {userprofileContext} from "../context/userpicrender"

export default function Uploadfile({ showAlert }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    // const [profile, setProfile] = useProfile()
    //   const {userprofile,profile}=useContext(userprofileContext)
    const handleupload = async (e) => {
        setLoading(true); // ✅ Set loading state
        const selectedFile = e.target.files[0]; // ✅ Get the file correctly
        if (!selectedFile) {
            alert("Please select a file");
            return;
        }

        setFile(selectedFile); // ✅ Update state
        const formData = new FormData();
        formData.append("profilepic", selectedFile); // ✅ Use selectedFile, not file
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v3/userpic/userpicupload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "auth-token": localStorage.getItem("auth-token")
                },
            });

            showAlert("Profile picture updated!", "success");
            // const data= await res.json()
            // console.log(res.data.imgurl);
            // setProfile({ ...profile, imgurl: res.data.imgurl });
            setLoading(false); // ✅ Reset loading state

        } catch (error) {
            console.log(error);
            showAlert("Error uploading profile picture", "error");
             setLoading(false)
        }
    }
    return (
        <>
            {loading ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", border: '2px solid #4a4a4a', backdropFilter: 'blur(10px)', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',height:"13vh" }} ><img src={loder} alt="Loading" style={{ width: '110px', height: '110px' }} /></div>
            ) : (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '2rem',
                    border: '2px solid #4a4a4a',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                    height:"13vh"
                }}>
                    <h1 style={{
                        color: 'white',
                        fontSize: '24px',
                        marginBottom: '20px',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                    }}>Upload your Profile pic</h1>
                    <input
                        type="file"
                        accept='image/*'
                        onChange={handleupload}
                        style={{
                            color: 'white',
                            background: '#3a3a3a',
                            padding: '10px',
                            border: '2px solid #4a4a4a',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    />
                </div>
            )}
        </>
    )
}

import React from 'react'
import { useState,useContext } from 'react';
import axios from "axios"
// import { useProfile } from '../context/userpicrender';
// import {userprofileContext} from "../context/userpicrender"

export default function Uploadfile({ showAlert }) {
    const [file, setFile] = useState(null);
    // const [profile, setProfile] = useProfile()
    //   const {userprofile,profile}=useContext(userprofileContext)
    const handleupload = async (e) => {
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
                    "auth-token":localStorage.getItem("auth-token")
                },
            });

            showAlert("Profile picture updated!", "success");
            // const data= await res.json()
            console.log(res.data.imgurl);

        } catch (error) {
            console.log(error);
            showAlert("Error uploading profile picture", "error");
        }
    }
    return (
        <div>
            <h1 style={{color:"white"}}>Upload your Profile pic </h1>
            <input type="file" accept='image/*' onChange={handleupload}  />
        </div>
    )
}

const express= require('express')
const router=express.Router()
const upload= require("../middleware/upload");
const Uploadpic=require("../models/Uploadpic")
const fetchUser =require("../middleware/fecthuser")
const cloudinary = require("../config/cloudinary")
const fs= require("fs")


router.post("/userpicupload", fetchUser, upload.single("profilepic"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
            folder: "user_profiles", // Optional folder in Cloudinary
          });
          fs.unlinkSync(req.file.path);

          const imgurl = cloudinaryResponse.secure_url; 
        
        // Check if user already has a profile picture
        const checkUser = await Uploadpic.findOne({ user: req.user });
        
        if (checkUser) {
            checkUser.profilePic = imgurl;
            await checkUser.save();
            
            return res.status(200).json({ "message": "Profile picture updated", imgurl });
        } else {
            // User doesn't have a profile picture, create new entry
            const pic = new Uploadpic({ profilePic: imgurl, user: req.user });
            await pic.save();
            return res.status(200).json({ "message": "Profile picture uploaded", imgurl });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": "Internal server error",error });
    }
});
router.get("/sendfrontend",fetchUser,async(req,res)=>{
    const checkUser = await Uploadpic.findOne({ user: req.user });
    console.log(checkUser)
    if(checkUser){

        return res.status(200).json({"picurl":checkUser.profilePic})
    }
    return res.status(202).json({"message":"NO pic to show"})

})

module.exports = router;
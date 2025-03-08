const express= require('express')
const router=express.Router()
const upload= require("../middleware/upload");
const Uploadpic=require("../models/Uploadpic")
const fetchUser =require("../middleware/fecthuser")



router.post("/userpicupload", fetchUser, upload.single("profilepic"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const imgurl = `/upload/${req.file.filename}`;
        
        // Check if user already has a profile picture
        const checkUser = await Uploadpic.findOne({ user: req.user });
        
        if (checkUser) {
            // User already has a profile picture, update it
            const newPic = { profilePic: imgurl };
            
            // Update the profile picture
            const updatedPic = await Uploadpic.findOneAndUpdate(
                { user: req.user },
                { $set: newPic },
                { new: true }
            );
            
            return res.status(200).json({ "message": "Profile picture updated", imgurl });
        } else {
            // User doesn't have a profile picture, create new entry
            const pic = new Uploadpic({ profilePic: imgurl, user: req.user });
            await pic.save();
            return res.status(200).json({ "message": "Profile picture uploaded", imgurl });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": "Internal server error" });
    }
});
router.get("/sendfrontend",fetchUser,async(req,res)=>{
    const checkUser = await Uploadpic.findOne({ user: req.user });
    console.log(checkUser)
    return res.status(200).json({"picurl":checkUser.profilePic})

})

module.exports = router;
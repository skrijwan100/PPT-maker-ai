const express = require("express");
const fecthuer = require("../middleware/fecthuser");
const History = require("../models/History");
const router = express.Router()

router.post("/addhistory", fecthuer, async (req, res) => {
    try {
        const { topicname, slidenumber, responce } = req.body;
        const adduserhistory = await History({
            topicname,
            slidenumber,
            responce,
            user: req.user

        })
        const savehistory = await adduserhistory.save()

        // console.log(savehistory)
        return res.status(200).json({ "message": "history add" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ "error": "Internal server error" })
    }
})

router.get("/viewhistory", fecthuer, async (req, res) => {
    try {
        const finduser= await History.findOne({user:req.user})
        if(finduser==null){
            return res.status(404).json({"message":"no history"})
        }
        const allhistory= await History.find({user:req.user})
        return res.status(200).json({allhistory})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "error": "Internal server error" })
    }

})

router.delete("/deletehistory/:id",fecthuer,async(req,res)=>{
    try {
        await History.findByIdAndDelete(req.params.id)
        return res.status(200).json({"message":"delete done"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ "error": "Internal server error" })
        
    }
})
module.exports = router

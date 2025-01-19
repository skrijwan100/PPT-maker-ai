const express = require("express")
const router= express.Router()

router.post("/register",async(req,res)=>{
    return res.status(200).send("done the function.")

})

module.exports=router
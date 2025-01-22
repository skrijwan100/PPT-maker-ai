const express = require("express")
const router = express.Router()
const jwt= require("jsonwebtoken")
const { body, validationResult } = require('express-validator');
const bcrypt= require("bcrypt")
const User = require("../models/User");
router.post("/register", [
    body("name", "Enter your name").isLength({min:3}),
    body("email", "Enter a valid email").isEmail(),
    body("profassion", "Enter your profassion").isLength({min:3}),
    body("password", "Enter your password more then 5 word").isLength({min:5})
], async (req, res) => {
    try {


        const { name, email, profassion, password } = req.body;
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        const validemail=  await User.findOne({email})
        if(validemail){
            return res.status(400).json({"message":"This is alredy have a account."})
        }
        const salt = await bcrypt.genSalt(14)
        const haspassword= await bcrypt.hash(password,salt);
        const user= await User({
            name:name,
            email:email,
            profassion:profassion,
            password:haspassword,

        })
        await user.save()
        return res.status(200).json({"message":"You register done"})

    } catch (error) {
        console.log(error)
        return res.status(505).json({ "erroe": "Internal server error." })
    }

})

router.post("/login",[
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter your password").isLength({min:5})
],async(req,res)=>{
    const {email,password}= req.body;
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    } 
    const finduser= await User.findOne({email})
    if(!finduser){
        return res.status(404).json({"error":"You don't have any account in this email."})

    }
    const chakepass= await bcrypt.compare(password,finduser.password)
    if(!chakepass){
        return res.status(400).json({"error":"Incorrect password"})
    }
    const authtoken= jwt.sign({
        user:finduser._id
    },process.env.JWT_SERECT)
    return res.status(200).json({"message":"Login done",authtoken})

})
module.exports = router
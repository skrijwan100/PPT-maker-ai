const express = require("express")
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt= require("bcrypt")
const User = require("../models/User");
router.post("/register", [
    body("name", "Enter your name").exists(),
    body("email", "Enter a valid email").isEmail(),
    body("profassion", "Enter your profassion").exists(),
    body("password", "Enter your password more then 5 word").isLength({})
], async (req, res) => {
    try {


        const { name, email, profassion, password } = req.body()
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

module.exports = router
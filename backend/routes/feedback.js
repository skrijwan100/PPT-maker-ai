const express = require('express')
const router = express.Router()
const Feedback = require("../models/Feedback")

router.post("/adduserfeedback", async (req, res) => {
    try {


        const { username, email, message } = req.body;
        const savefeedback = await Feedback({
            username: username,
            email: email,
            message: message,
        })
        await savefeedback.save()
        return res.status(200).json({ "message": "add done", "status": true })
    } catch (error) {
        console.log(error);
        return res.status(500).json({"message":"Internal server Error","status":false})
    }

})


module.exports = router;
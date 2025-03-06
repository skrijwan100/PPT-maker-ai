const mongoose = require("mongoose")
const { Schema } = mongoose;

const userpic = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    profilePic: {
        type: String,
        default: "/uploads/default.png"
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Uploadpic', userpic);
const mongoose = require("mongoose")
const { Schema } = mongoose;

const history= new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    topicname:{
        type:String,
        require:true,
    },
    slidenumber:{
        type:Number,
        require:true,
    },
    responce:{
        type:String,
        require:true
    },
})

module.exports=mongoose.model("History",history);
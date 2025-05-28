const mongoose= require("mongoose");
const { Schema } = mongoose; 
const feedback= new Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    message:{
        type:String,
        require:true
    },
})
module.exports=mongoose.model('Feedback',feedback);
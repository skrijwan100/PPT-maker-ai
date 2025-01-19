const mongoose = require("mongoose")
const mongoURI="mongodb://localhost:27017/ppt-maker-ai"

connectserver=async ()=>{
    try{
        await mongoose.connect(mongoURI)
        console.log("The server is run.")
    }catch(error){
        console.log(error)
    }
}

module.exports= connectserver
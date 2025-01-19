const express= require("express")
const app = express()
const PORT= process.env.PORT
const server= require("./db")
server()
require('dotenv').config();

app.use(express.json());

app.use("/api/v1/userauth",require("./routes/userauth"))

app.get("/",(req,res)=>{
  return res.status(200).json({"run":"done"})
})

app.listen(process.env.PORT,()=>{
    console.log(`the app is run in ${process.env.PORT} port `)
})
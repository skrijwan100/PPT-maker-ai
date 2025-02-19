const express= require("express")
const app = express()
const cors= require("cors")
const PORT= process.env.PORT
const server= require("./db")
server();
require('dotenv').config();
const corsOptions = {
  origin:process.env.FRONTEND_URL, // Allow only requests from this origin
  methods: 'GET,POST,DELETE', // Allow only these methods
  allowedHeaders: ['Content-Type', 'Authorization','auth-token'] // Allow only these headers
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1/userauth",require("./routes/userauth"));
app.use("/api/v2/userhistory",require("./routes/userhistory"));

app.get("/",(req,res)=>{
  return res.status(200).json({"run":"Your code is running"});
});

app.listen(process.env.PORT,()=>{
    console.log(process.env.FRONTEND_URL);
    console.log(`the app is run in ${process.env.PORT} port `);
});

const jwt=require('jsonwebtoken')
const jwt_secret=process.env.JWT_SERECT;

const fecthuer=(req,res,next)=>{
    try {
        const authtoken= req.header("auth-token")
        if(!authtoken){
            return res.status(404).json({"massage":"Invalid Auth token"})
         }
         const data= jwt.verify(authtoken,jwt_secret)
         console.log(data)
         req.user=data.user
         next();
    } catch (error) {
         console.log(error)
         return res.status(500).json({"error":"Intarnal server error"})
    }

}

module.exports=fecthuer;
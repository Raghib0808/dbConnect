import jwt from "jsonwebtoken";

const isLoggedIn = async (req,res, next)=>{
        try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message: "You are not logged in",
                sucess: false
            });
        }
        
        const decodedData=jwt.verify(token,process.env.JWT_SECRET);
        req.user = decodedData;
        
        next();
    }
    catch(err){
        return res.status(401).json({
            message: "You are not logged in",
        })
    }
}
export default isLoggedIn;
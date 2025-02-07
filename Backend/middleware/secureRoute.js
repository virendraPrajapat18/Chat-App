import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

const secureRoute = async (req,res,next)=>{

  try{

    const token = req.cookies.jwt;
    // console.log("cookies",req.cookies);
    if(!token){
      return res.status(401).json({message:"Not authorized"});
    }
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    if(!verified){
      return res.status(403).json({message:"Invalid Token"});
    }
    const user = await User.findById(verified.userId).select("-password");
    if(!user){
      return res.status(400).json({message:"User not found"});
    }
    // console.log("user at secureRoute:",user);
   req.user = user;
   
   next();

  }catch(error){
    console.log(error);
    res.status(501).json({message:"Internal Server error"});
  }
}

export default secureRoute;
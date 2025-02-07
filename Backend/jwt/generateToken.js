import jwt from "jsonwebtoken";


const createTokenAndSaveCookie=(userId,res)=>{
  const token = jwt.sign({ userId }, process.env.SECRET_KEY,{expiresIn:"5d"});
  //  console.log("token:",token)
  res.cookie("jwt",token)
  // console.log("response:",res.cookie);
}

export default createTokenAndSaveCookie;
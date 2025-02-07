import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/generateToken.js";

export const Signup = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;

    // Check if passwords match
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists"});
    }


    //hashing the password
    const hashedPassword = await bcrypt.hash(password,10);
    // Create a new user
    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
      confirmpassword,
    });

    // Save the new user
    await newUser.save();

    if(newUser){
      createTokenAndSaveCookie(newUser._id,res);
     return res.status(201).json({
       message: "User registered successfully",
       user: {
         _id: newUser._id,
         name: newUser.name,
         email: newUser.email,
       },
     });
    }
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};


export const login = async (req,res)=>{
  const { email, password } = req.body;
  try{

    
    const user = await User.findOne({email});
    const isMatch =await bcrypt.compare(password,user.password);
    if(!user || !isMatch){
      return res.status(404).json({message:"Invalid User or Password"});
    }
    createTokenAndSaveCookie(user._id,res);
    res.status(201).json({message:"User logged in successfully",user:{
      _id:user._id,
      name:user.name,
      email:user.email,
    }})

  }catch(error){
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
}



export const logout = async(req,res)=>{

  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
}


export const getUserProfile= async (req,res)=>{
  try{
    const loggedInUser = req.user._id;
    // const loggedInUser = "679b66d0edb7bf41ee7ee960";
    const allUsers = await User.find({_id:{$ne: loggedInUser}}).select("-password");
    // console.log("Users:",allUsers)
    res.status(201).json(allUsers);
  }catch(error){
    console.log("Error in allUsers Controller"+ error);
    res.status(500).json({message:"Server error"});
  }
}
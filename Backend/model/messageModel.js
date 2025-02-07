 import mongoose from "mongoose";
 import User from "./userModel.js";


 const messageSchema = mongoose.Schema({
  sender:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiver:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message:{
    type: String,
    required: true,
    maxlength: 1000, 
    trim: true,
    // validate:[
    //   {
    //     validator: (value)=> value.lenght > 0,
    //     message: "Message cannot be empty",
    //   }
    // ]
  },
  createdAt: { type: Date , default: Date.now },
 },{
  timestamps: true,
 }
)


const Message = mongoose.model("Message",messageSchema);

export default Message;
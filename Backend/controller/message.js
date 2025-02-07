import Conversation from "../model/conversationModel.js";
import Message from "../model/messageModel.js";
import {getReceiverSocketId} from "../socketIO/server.js"
import { io } from "../socketIO/server.js";



export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
   
    const { id: receiverId } = req.params;
    const senderId = req.user?._id; // Ensure req.user exists

    // Validate sender and receiver IDs
    if (!senderId || !receiverId) {
      return res
        .status(400)
        .json({ error: "Sender and Receiver are required" });
    }
    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      sender:senderId,
      receiver:receiverId,
      message: message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await conversation.save()
    await newMessage.save();
    // await Promise.all([conversation.save(), newMessage.save()]); // run parallel
    console.log("nweMessage from message:",newMessage);
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      console.log("receiverId",receiverSocketId);
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage", error);
    res.status(500).json({ error: "Internal server error in message" });
  }
};


export const getMessage = async (req,res)=>{
  try{
    const {id:chatUser} = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: {$all: [senderId,chatUser]},
    }).populate("messages");

     if (!conversation) {
       return res.status(201).json([]);
     }

    const message = conversation.messages;
    res.status(201).json(message);

  }catch(error){
    console.log("Message getting error:",error);
    res.status(500).json({message:"Internal server error from getMessage"});
  }
}


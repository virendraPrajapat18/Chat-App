import React, { useEffect } from 'react'
import { useSocketContext } from './SocketContext'
import useConversation from '../stateManage/useConversation';
import sound from "../assets/notification.mp3"
// import Messages from '../home/right/Messages';


function useGetSocketMessage() {

  const {socket} = useSocketContext();
  const {messages,setMessages} = useConversation();

  useEffect(()=>{

    socket.on("newMessage",(newMesage)=>{
      const notification = new Audio(sound);
      // console.log("newMessage from Socket:",newMesage);
      notification.play();
      setMessages([...messages,newMesage]);
      // console.log("Messaeg by socket:",messages);
    });
    return ()=> socket.off("newMessage");
  },[socket,messages,setMessages]);

  
}

export default useGetSocketMessage

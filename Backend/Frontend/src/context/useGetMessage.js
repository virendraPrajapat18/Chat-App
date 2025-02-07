import React, { useEffect, useState } from "react";
import useConversation from "../stateManage/useConversation";
import axios from "axios";


function useGetMessage(){

  const [loading,setLoading] = useState(false);
  const {messages,setMessages,selectedConversation} = useConversation(); 

  useEffect(()=>{
    const getMessage = async ()=>{
      setLoading(true);
      if(selectedConversation && selectedConversation._id){
      try{
        const response = await axios.get(`/api/message/get/${selectedConversation._id}`)

        setMessages(response.data);
        // console.log("response:",response.data);
        setLoading(false);
      }catch(error){
        console.log("error in useGetMessage:",error);
         setLoading(false);
      }
    }
    }
    getMessage();
  },[selectedConversation,setMessages]);

  return {
    messages,loading
  }
}

export default useGetMessage;
import React from 'react'

function Message({message}) {

  const authUser = JSON.parse(localStorage.getItem("messenger"));
  // console.log("authUser:",authUser);
  
  const itsme = message.sender === authUser.user._id;
  // console.log("sender", message.sender);
  
  
  const chatName = itsme? "chat-end":"chat-start";
  const chatColor = itsme? "bg-blue-400":"";

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([],{
    hour:'2-digit',
    minute:'2-digit'
  })
  


  return (
    <div className="p-4">
      <div className={`chat ${chatName} `}>
        <div className={`chat-bubble text-white ${chatColor}`}>
          {message.message}
        </div>
        <div className="chat-footer">{formattedTime}</div>
      </div>
    </div>
  );
}

export default Message

import React from 'react'
import useConversation from '../../stateManage/useConversation.js';
import { useSocketContext } from '../../context/SocketContext.jsx';
import GetAllUsers from "../../context/GetAllUsers";

function ChatUser() {

const {selectedConversation} = useConversation();
// console.log(selectedConversation);

  // const [allUsers] = GetAllUsers();

 const {onlineUsers} = useSocketContext();
//  const isOnline = onlineUsers.includes(user._id);

const getOnlineUserStatus = (userId)=>{
   return onlineUsers.includes(userId)? "online":"offline";
}


//  const isOnline = onlineUsers.includes(user._id);


  return (
    <>
      <div className="pl-5 pt-5 pb-3 h-[12vh] flex space-x-4 bg-gray-900 hover:bg-gray-600 duration-300">
        <div>
          {/* <div className={`avatar ${isOnline ? "avatar-online" : ""}`}> */}
          <div className="avatar " >
            <div className="w-14 rounded-full">
              <img src="profile.png" />
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-xl">{selectedConversation.name}</h1>
          {/* <h1 className='text-xl'>Virendra</h1> */}
          <span className="text-sm">{ getOnlineUserStatus(selectedConversation._id) }</span>
        </div>
      </div>
    </>
  );
}

export default ChatUser

import React from 'react'
import useConversation from '../../stateManage/useConversation';
import { useSocketContext } from '../../context/SocketContext';

function User({user}) {

  const {selectedConversation,setSelectedConversation} =   useConversation();

 const isSelected = selectedConversation?._id === user._id;

 const {socket, onlineUsers} = useSocketContext();
 const isOnline = onlineUsers.includes(user._id);


  return (
    <div
        className={`hover:bg-slate-600 duration-300 ${
          isSelected ? "bg-slate-600":""
        }`} onClick={()=> setSelectedConversation(user)}
    >
    
      <div className="flex space-x-4 px-8 py-7 hover:bg-slate-600 duration-300 cursor-pointer">
        <div className={`avatar ${ isOnline ? "avatar-online":""}`}>
          <div className="w-14 rounded-full">
            <img src="profile.png" />
          </div>
        </div>

        <div>
          <h1 className='font-bold'>{user.name}</h1>
          <span className='font-sm'>{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User

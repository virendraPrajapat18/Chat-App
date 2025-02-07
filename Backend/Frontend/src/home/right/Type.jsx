import React, { useState } from 'react'
import { IoIosSend } from "react-icons/io";
import useSendMessage from '../../context/useSendMessage';

function Type() {

 const {  sendMessages } = useSendMessage();
 const [message,setMessage] = useState("");

 const handleSubmit = async(e)=>{
  e.preventDefault();
  await sendMessages(message);
  setMessage("");
 }


  return (
    <>
      <form  onSubmit={handleSubmit}>
        <div className="flex space-x-3 h-[8vh] text-center bg-gray-800">
          <div className="w-[70%] mx-4  ">
            <input
              type="text"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              placeholder="Type here"
              className="border-[1px] border-gray-700 bg-slate-900 rounded-lg flex items-center w-full grow outline-none border-none  py-3 px-3 mt-1  "
            />
          </div>
          <button className=" text-3xl">
            <IoIosSend />
          </button>
        </div>
      </form>
    </>
  );
}

export default Type

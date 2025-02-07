import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import GetAllUsers from "../../context/GetAllUsers.jsx";
import useConversation from "../../stateManage/useConversation.js"
import toast from 'react-hot-toast';

const Search = () => {

  const [search,setSearch] = useState("");

  const [allUsers] = GetAllUsers();
  const {setSelectedConversation} = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    // console.log("allUsers:",allUsers);
    const conversation = allUsers.find((user) =>
      user.name?.toLowerCase().includes(search.toLowerCase())
    );
    console.log("conversation:",conversation);
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };

  return (
    <div className="px-6 py-4">
      <form 
        onSubmit={handleSubmit}
      >
        <div className="flex space-x-3">
          <label className="border-[1px] border-gray-700 bg-slate-900 rounded-lg flex items-center gap-2 w-[80%] p-3 ">
            <input
              type="text"
              className="grow outline-none border-none bg-transparent"
              placeholder="Search"
              value={search}
              onChange={(e)=> setSearch(e.target.value)}
            />
          </label>
          <button>
            <IoSearch className='text-5xl p-2 hover:bg-gray-600 rounded-full duration-300' />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Search






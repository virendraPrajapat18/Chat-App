import axios from 'axios';
import React, { useState } from 'react'
import { TbLogout2 } from "react-icons/tb";
import Cookies from "js-cookie";
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';



const Logout = () => {

const [loading,setLoading] = useState(false);
 const navigate = useNavigate();
 const [setAuthUser] = useAuth();

const handleLogout = async ()=>{
  setLoading(true);
  try{
    const res = await axios.post("/api/user/logout");
    localStorage.removeItem("messenger");
    // Cookies.remove("jwt");
    // navigate("/login");
    //  setAuthUser(null); 
    setLoading(false);
    toast.success("Logout successfully");
  }catch(error){
    console.log("Error from logout:",error);
    toast.error("Failed to Logout")
  }
}

  return (
    <div className="w-[4%]  bg-slate-950 text-white flex flex-col justify-end">
      <div className="p-3 align-bottom">
        <button>
        {/* <Link  to="/login" > */}
          <TbLogout2
            onClick={handleLogout}
            className="text-5xl p-2 hover:bg-gray-600 rounded-lg duration-300"
          />
        {/* </Link> */}
        </button>
      </div>
    </div>
  );
}

export default Logout;

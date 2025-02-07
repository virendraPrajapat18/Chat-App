// import io from "socket.io-client";
// import React, { useContext, useEffect, useState } from "react";
// import { createContext } from "react";
// // import { AuthProvider } from "./AuthProvider";
// import { useAuth } from "./AuthProvider";


// const socketContext = createContext();

// export const useSocketContext=()=>{
//   return useContext(socketContext);
// }

// export const SocketProvider = ({children})=>{

//   const [socket,setSocket] = useState(null);
//   const [onlineUsers,setOnlineUsers] = useState([]);
  
//   const [authUser] = useAuth();

//   const data =JSON.parse( localStorage.getItem("messenger"));
//   console.log("data:",data);
  

//   useEffect(()=>{
//     if(authUser){
//       const socket = io("http://localhost:4001/",{
//         query:{
//           userId: data.user._id,
//         },
//       });
//       setSocket(socket);
//       socket.on("getonline",(users)=>{
//         setOnlineUsers(users);
//         console.log("Socket Disconnect")
//       })
//       return ()=> socket.close();
//     }
//     else{
//       if(socket){
//         socket.close();;
//         setSocket(null);
//       }
//     }
//   },[authUser]);

//   return (
//     <socketContext.Provider value={{socket,onlineUsers}}>
//       {children}
//     </socketContext.Provider>
//   )

// }





import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";
const socketContext = createContext();

// it is a hook.
export const useSocketContext = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [authUser] = useAuth();

  const data = JSON.parse(localStorage.getItem("messenger"));
    // console.log("data:",data.user._id);

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:5000", {
        query: {
          userId: data.user._id,
        },
      });
      // console.log("Socket:",socket);
      setSocket(socket);
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);
  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};






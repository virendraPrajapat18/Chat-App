import React ,{useEffect} from 'react'
import ChatUser from './ChatUser';
import Messages from './Messages';
import Type from './Type';
import useConversation from '../../stateManage/useConversation.js';
import Loading from '../../components/Loading.jsx';
import {useAuth} from "../../context/AuthProvider.jsx";
import { CiMenuFries } from "react-icons/ci";


const Right = () => {

 
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);


  return (
    <div className="w-full bg-slate-800 text-gray-300">
      <div>
        {!selectedConversation ? (
          <Nochat />
        ) : (
          <>
            {" "}
            <div >
              <ChatUser></ChatUser>

              <div
                className="py-2 overflow-y-auto"
                style={{ maxHeight: "calc(88vh - 8vh)" }}
              >
                <Messages></Messages>
              </div>

              <Type></Type>
            </div>{" "}
          </>
        )}
      </div>
    </div>
  );
}
 
export default Right;

const Nochat = ()=>{
  const [authUser] = useAuth();
  // console.log("authuser:",authUser);

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-center font-semibold text-xl">
          Welcome 
          <br></br>
          Select a Conversation to start a chat.
        </h1>
        {authUser.name && <Nochat/>}
      </div>
    </>
  );
}

// const NoChatSelected = () => {
//   const [authUser] = useAuth();
//   console.log(authUser);
//   return (
//     <>
//       <div className="relative">
//         <label
//           htmlFor="my-drawer-2"
//           className="btn btn-ghost drawer-button lg:hidden absolute left-5"
//         >
//           <CiMenuFries className="text-white text-xl" />
//         </label>
//         <div className="flex h-screen items-center justify-center">
//           <h1 className="text-center">
//             Welcome{" "}
//             <span className="font-semibold text-xl">
//               {authUser.name}
//             </span>
//             <br />
//             No chat selected, please start conversation by selecting anyone to
//             your contacts
//           </h1>
//         </div>
//       </div>
//     </>
//   );
// };
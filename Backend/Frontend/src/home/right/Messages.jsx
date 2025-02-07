import React,{useRef,useEffect} from 'react'
import Message from './Message';
import useGetMessage from '../../context/useGetMessage.js';
import Loading from "../../components/Loading.jsx";
import useGetSocketMessage from '../../context/useGetSocketMessage.jsx';

function Messages() {

  const {messages,loading} = useGetMessage();
  useGetSocketMessage();
  // console.log(messages);

   const lastMsgRef = useRef();
   useEffect(() => {
     setTimeout(() => {
       if (lastMsgRef.current) {
         lastMsgRef.current.scrollIntoView({
           behavior: "smooth",
         });
       }
     }, 100);
   }, [messages]);

  


  return (
    <div className='p-4' style={{minHeight:"calc(88vh - 10vh)"}} >

      {loading ? (<Loading></Loading>) : (messages.length>0 && 
      messages.map((message)=>{
        // return  <Message key={message._id} message={message} />
        return  <div key={message._id} ref={lastMsgRef} >
          <Message message={message} />
        </div>
      }) ) }
      
     
     {!loading && messages.length === 0 && <div><p className='text-center text-white mt-[20%] font-bold'>Say! Hi</p> </div> }
      
      
    </div>
  );
} 

export default Messages;

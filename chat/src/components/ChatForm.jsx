import React, {useEffect, useState, useRef} from 'react'
import MessageBubble from './MessageBubble'
import { flyMessage, getMessage} from '@/utils/APIRoutes';
import { useChatContext } from '@/Context/ChatContext';
import axios from 'axios';

function ChatForm({socket}) {
  
  
  const {selectedChat, user, chats, message, setMessage} = useChatContext();
  const [msgContent, setMsgContent] = useState();

  useEffect(()=> {
    if(socket.current) {
      socket.current.on("msg received", (msg)=> {
        if(!selectedChat || msg.chat != selectedChat) {
          // give notification
        } 
        else{
          setMessage([...message, msg])
        }
      })
    }
    
  })

  async function fetchMessage() {
      const config = {
        headers: {
            Authorization : `Bearer ${user?.token}`
        }
      }
      const {data} = await axios.post(`${getMessage}`,
        {
        userId: user.id, 
        chatId: selectedChat
        }, 
        config
        );
      setMessage(data);
    
  }

  async function sendMessage(e) {
    e.preventDefault()
    const config = {
      headers: {
          Authorization : `Bearer ${user?.token}`
      }
    }
    const {data} = await axios.post(`${flyMessage}`,{
      senderId: user.id, 
      chatId: selectedChat,
      message: msgContent
      }, 
      config);
    setMsgContent("");
    console.log(data);
    socket.current.emit("new msg", data);
    setMessage(prev => [...prev, data])
  }

  
  useEffect(() => {
    if(selectedChat) {
      fetchMessage();
    } else return
  }, [selectedChat])

  return (
    <div className='w-[1000px]  flex flex-col  text-[20px] text-black border-2 border-l-0 border-black'>
        <div className='bg-gray-400 p-2 font-bold'>
            {selectedChat === user?.id ? "Admin" : chats}
        </div>
        <div className='h-full overflow-scroll bg-gray-100 p-2'>
          <MessageBubble />
        </div>
        <form className=' w-full flex flex-row bg-purple-500' onSubmit={(e)=>sendMessage(e)}>
            <input
                className='w-full'
                type="text"
                placeholder="Type message here"
                name="message"
                required="true"
                value={msgContent}
                onChange={(e) => setMsgContent(e.target.value)}
            >
            </input>
            <button type="submit" >Send</button>
        </form>
    </div>
  )
}

export default ChatForm
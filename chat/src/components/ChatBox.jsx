"use client"

import Contacts from './Contacts'
import ChatForm from './ChatForm'
import React, {useRef, useEffect} from 'react'
import  io  from 'socket.io-client'
import { useChatContext } from '@/Context/ChatContext';
const ENDPOINT = "http://localhost:5000"

export default function ChatBox() {
  let socket = useRef();
  const { user } = useChatContext();

  useEffect(() => {
    if(user){
      socket.current = io(ENDPOINT);
    }
    return () => {
      socket.current?.disconnect();
    }
    
  }, [user])
  return (
    <div className='mt-[100px] h-[600px] overflow-scroll flex flex-row bg-white'>
        <Contacts socket={socket}/>
        <ChatForm socket={socket}/>
    </div>
  )
}

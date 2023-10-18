"use client"

import { fetchChat, searchRoute } from '@/utils/APIRoutes';
import React, { useEffect, useState } from 'react'
import { useChatContext } from '@/Context/ChatContext';
import axios from 'axios';

export default function Contacts({socket}) {
    const {selectedChat, setSelectedChat, user, setChats, message} = useChatContext();
    const [contact, setContacts] = useState([]);
    const [search, setSearch] = useState("");
    const [found, setFound] = useState(true);
    const test = 0;

    //function axios search
    async function searchContacts() {
        if(user) {
            const config = {
                headers: {
                    Authorization : `Bearer ${user?.token}`
                }
            }
            if(search) {
                const { data } = await axios.get(`${searchRoute}/?search=${search}`, config);
                if(data.results === "Not Found") {
                    setFound(false);
                } else {
                    setContacts(data);
                    setFound(true);
                }
            } else getContacts();
        }
        
    }

    // function axios get contacts
    async function getContacts() {
        if(user) {
            const config = {
                headers: {
                    Authorization : `Bearer ${user?.token}`
                }
            }
            const { data } = await axios.get(`${fetchChat}/${user.id}`, config)
            setContacts(data);
        }
        
    }
    // get all contacts if admin || just your chat if user
    useEffect(() => {
        try {
            getContacts();
        } catch (error) {
            console.log(error)
        }
    }, [user,message])

    useEffect(() => {
        searchContacts();
    }, [search])

    useEffect(() => {
        if(selectedChat) {
            socket.current.emit("join room", selectedChat);
        }
    }, [selectedChat])

  return (
    <div className='w-[200px]  flex flex-col  text-[20px] text-black border-2 border-black'>
        <div className='bg-gray-400 p-2 font-bold'>
            Contacts
        </div>
        <div className='w-full p-2 bg-slate-300'>
            <input type='text' placeholder='search' value={search} onChange={(e) => setSearch(e.target.value)}/>
        </div>
        <div className='h-full overflow-scroll flex flex-col '>
        {  found?  contact.map((contact, index) =>
            (
                <div key={index} className='px-2 hover:cursor-pointer' onClick={() =>{ 
                    setSelectedChat(contact.chatId._id); 
                    setChats(contact.chatId.username);
                }}
                    style={{backgroundColor: `${selectedChat == contact.chatId._id ? "#E39FF6" : ""}`}}
                >
                            <div className=''>
                                {contact.chatId.username}
                            </div>
                            <div className=' text-[15px] text-green-700 text-ellipsis overflow-hidden whitespace-nowrap'>
                                {contact.latestMessage?.content ? contact.latestMessage.content : "Start Chatting"}
                            </div>
                </div>
            )) : <div className='p-4 text-center'>Not Found</div>
        }            
        </div>
    </div>
  )
}

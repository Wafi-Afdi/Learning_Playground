"use client"

import React, { useEffect, useState, useRef } from 'react'
import moment from 'moment-timezone';
import { useChatContext } from '@/Context/ChatContext';
import { isFromAdmin, isFromYou } from '@/app/config/chatLogic';
export default function MessageBubble() {
    const scrollRef = useRef();
    const {user, message} = useChatContext();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behaviour: 'smooth'})
      }, [message])
    return (
    <div className='w-full flex flex-col h-full'>
        {
            message.map((data,index) => { 
                let time= moment(data.createdAt);
                let localTimeString = time.tz('Asia/Jakarta').format('DD-MM, HH:mm');
                return (
                <div key={index} ref={scrollRef} className={`flex flex-col mt-2 ${isFromAdmin(data,user) || isFromYou(data,user) ? "self-end" : ""}`}>
                    <p className={`rounded-full px-2 py-1 ${isFromAdmin(data,user) || isFromYou(data,user) ? "bg-blue-500 text-white self-end" : "bg-gray-500 text-white"} max-w-[100%]  w-fit `}>
                        {data.content}
                    </p>
                    <p className={`text-[15px] ml-[8px] ${isFromAdmin(data,user) || isFromYou(data,user) ? "self-end" : ""}`}>
                        {localTimeString}
                    </p>
                </div>
            )})
        }
    </div>
  )
}

"use client"
import { DataProvider } from '@/Context/ChatContext'
import ChatBox from '@/components/ChatBox'
import React from 'react'
import Logout from '@/components/Logout'
function page() {
  
  return (
      <DataProvider>
        <div className=' flex h-screen relative justify-center bg-blue-500'>
        <ChatBox />
        <Logout />
        </div>
      </DataProvider>
      

  )
}

export default page
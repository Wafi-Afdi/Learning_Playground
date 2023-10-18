import React from 'react'
import { useRouter } from 'next/navigation'
function Logout() {
    const router = useRouter();

    const onLogOut = () => {
        localStorage.removeItem("userInfo")
        router.push('/')
    }
  return (
    <div className='p-5 h-fit mt-[100px] bg-blue-200 border-2 border-blue-950 hover:cursor-pointer' onClick={onLogOut}>
        Logout
    </div>
  )
}

export default Logout
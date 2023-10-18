'use client'

import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { loginRoutes, registerRoute } from '@/utils/APIRoutes';

export default function LoginSignUp() {
    const router = useRouter()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("admin");
    const [loginAction, setLoginAction] = useState(false);


    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
        if(userInfo) {
          router.push('/chat')
        }
    
      }, [])

    async function submitHandler(e) {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            const {data} = await axios.post(
                loginAction ? 
                loginRoutes
                    :
                registerRoute, 
                {password, username, role},
                config
            )
            if(data.status == true) {
                localStorage.setItem('userInfo', JSON.stringify(data))
                return router.push('/chat')
            }
            
        } catch (error) {
            console.log("ERR : " + error.message)
        }
    }


  return (
    <div className='flex flex-col min-h-screen justify-center items-center bg-blue-400'>
        <form className='flex flex-col' onSubmit={(e) =>submitHandler(e)}>
            <input 
                value={username} 
                type="text"
                placeholder="Username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                value={password} 
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <label for="cars">Choose a role:</label>
            <select
                name="role"
                placeholder='select a role'
                value={role}
                onChange={(e) => {
                    setRole(e.target.value);
                    console.log(role)
                }}
            >
                <option value="admin">Admin</option>
                <option value="user">User</option>
            </select>
            <button type="submit" onClick={() => setLoginAction(false)}>Signup</button>
            <button type="submit" onClick={() => setLoginAction(true)}>Login</button>
        </form>
        
    </div>
  )
}

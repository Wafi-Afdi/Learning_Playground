'use client'
import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation'
const DataContext = createContext({});


export const DataProvider = ({ children }) => {
    
    const router = useRouter();
    const [message, setMessage] = useState([]);
    const [selectedChat, setSelectedChat] = useState();
    const [user, setUser] = useState();
    const [notification, setNotification] = useState([]);
    const [chats, setChats] = useState();

    
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
    
        if (!userInfo) router.push("/");


        }, []);
    return (
        <DataContext.Provider value={{
            selectedChat,
            setSelectedChat,
            user,
            setUser,
            notification,
            setNotification,
            chats,
            setChats,
            message,
            setMessage
            
        }}>
            {children}
        </DataContext.Provider>
    )
}

export const useChatContext = () => useContext(DataContext);

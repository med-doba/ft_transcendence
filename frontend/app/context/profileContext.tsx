'use client'

import { usePathname } from "next/navigation";
import React , { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const FriendStatusContext = createContext<any>({});


export const ContextFriendProvider = ({ children }: { children: any })=> {
    
    const pathname = usePathname();
    let nickname : string = pathname.split("/")[2];
    console.log("niiimkm ===== ", nickname);
    const [friendshipStatus, setFriendshipStatus] = useState('');
    const getFriendshipStatus = async () => {
      try {
        const res = await fetch(`http://localhost:8000/user/FriendStatus`, {
          method: "Post",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({nickname: nickname}),
        });
        if (res.ok) {       
          const status = await res.json();
          setFriendshipStatus(status.status);
        }
      } catch (error : any) {
        console.log("data Ere", error.message)
        toast.error(error.message);
      }
    };
    useEffect(() => {
        getFriendshipStatus();
      }, []);   
      console.log("friendshipStatus: ", friendshipStatus);

    const updateStatus = () => {
      getFriendshipStatus();
    }
    return (
        <FriendStatusContext.Provider value={{friendshipStatus, updateStatus}}>
        {children}
      </FriendStatusContext.Provider>
    );
}
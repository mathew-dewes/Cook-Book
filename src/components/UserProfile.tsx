"use client"

import { getUserDetails } from "@/db/users";
import Image from "next/image";
import { useEffect, useState } from "react"
import UserSettings from "./UserSettings";

export default function UserProfile({userId, refresh}: {userId: string, refresh: number}){
    const [user, setUser] = useState<any>(null);

    const refreshUser = async ()=>{
        const updatedUser = await getUserDetails(userId);
        console.log(updatedUser);
        
        setUser(updatedUser);
    }

    useEffect(()=>{
        refreshUser()
    },[]);

    if (!user) return <p>Loading...</p>
    
    return (
        <div>
            <Image className="avatar" alt="profile-image" width={200} height={200} src={`${user.image_url}?v=${user.created_at}`}></Image>
            <UserSettings userId={userId} onUploadComplete={refreshUser}/>

        </div>
    )
}


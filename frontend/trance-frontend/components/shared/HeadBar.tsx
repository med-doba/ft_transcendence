'use client'
import Image from 'next/image';
import React, { useState } from 'react'
import notification from '../../public/notif.svg'
import profilePic   from '../../public/profilePic.svg'

const HeadBar = () => {

    const   [searchTerm, setSearchTerm] = useState('');

    const   handleSearch = (e: any) => {
        // e.preventDefault();
        
    };

    return (
        <div className='bg-green-950 h-[6.625%] w-full rounded-[15px] px-[15px] flex flex-row justify-between'>
            <div>
                <h1 className='text-2xl '>Hi, PlayerName</h1>
            </div>
            <div className='bg-pink-700 w-[29.17%] h-[65.52%]'>
                <form className="w-full" onSubmit={handleSearch}>
                    <input type="text" placeholder='Search...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                </form>
            </div>
            <div className='flex flex-row'>
                <Image
                    priority
                    src={notification}
                    alt='notification'
                />
                <Image
                    priority
                    src={profilePic}
                    alt='profilePic'
                />
            </div>
        </div>
    )
}

export default HeadBar
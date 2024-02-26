import Link from 'next/link'
import React from 'react'
import dashboard from '../../public/dashboard.svg'
import chat from '../../public/chat.svg'
import userProfile from '../../public/userProfile.svg'
import logo from '../../public/logo.svg'
import logOut from '../../public/logout.svg'
import Image from 'next/image'

const NavBar = () => {
    return (
        // <div className='bg-cyan-600 w-[5.60%] h-[89.625%] rounded-[15px]'>
        <div className='bg-[#189AB4] w-[5.60%] h-full rounded-[15px] flex flex-col items-center justify-between mx-auto py-[10px]'>
            <div className='bg-transparent flex flex-col gap-20 justify-between items-start'>
                <>
                    <Link href='/Dashboard'>
                        <Image 
                            priority
                            src={logo}
                            alt="logo"
                            />
                    </Link>
                </>
                <>
                    <ul className='flex flex-col items-center space-y-10 justify-items-center'>
                        <li>
                            <Link href='/Dashboard'>
                                <Image 
                                    priority
                                    src={dashboard}
                                    alt="dashboard"
                                />
                            </Link>
                        </li>
                        <li>
                            <Link href='/Chat'>
                                <Image 
                                    priority
                                    src={chat}
                                    alt="chat"
                                />
                            </Link>
                        </li>
                        <li>
                            <Link href='/profile/med-doba'>
                                <Image 
                                    priority
                                    src={userProfile}
                                    alt="user-profile"
                                />
                            </Link>
                        </li>
                    </ul>
                </>
            </div>
            <div className='bg-transparent'>
                <Link href='/'>
                    <Image 
                        priority
                        src={logOut}
                        alt="logOute"
                    />
                </Link>
            </div>
        </div>
    )
}

export default NavBar
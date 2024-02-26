import BoxHolder from '@/components/shared/BoxHolder';
import HeadBar from '@/components/shared/HeadBar';
import NavBar from '@/components/shared/NavBar';
import React from 'react'

const   Page = () => {
    return (
            <div className='bg-sky-900 h-screen w-screen flex flex-col items-end px-[1.66%] pb-[1.66%]'>
                {/* <div className='h-full w-full'> */}
                    <HeadBar></HeadBar>
                {/* </div> */}
                <div className=' flex h-full w-full  bg-transparent space-x-[1.25%] items-end flex-row'>
                    <NavBar />
                    <BoxHolder></BoxHolder>
                </div>
            </div>
    )
}

export default Page;
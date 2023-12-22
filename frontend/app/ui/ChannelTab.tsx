// "use client"
import React from 'react'
import UserChannels from './UserChannels';
import { CiSearch } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CreateChannelIcon } from './CustomIcons';
import CreateChannelComponent from './CreateChannelComponent';


const ChannelTab = () => {
	return (
		<div className="bg-teal-600 rounded-[15px] p-3 w-full shadow-lg lg:w-full h-[49%] flex flex-col">
			<h1 className='text-teal-300 font-bold text-lg mb-1'>CHANNELS</h1>
			<div className='flex flex-row justify-around rounded-2xl w-full mb-2'>
				<div className='flex flex-row rounded-s-xl bg-cyan-100 w-4/5'>
					<CiSearch
						className='w-8  h-10 stroke-1 bg-cyan-100 rounded-s-lg pl-2 text-black'
					/>
					<input type='text'
						placeholder='Search Channels...'
						className='w-4/5 h-10 bg-cyan-100 border-none focus:ring-0 text-black'
					/>
				</div>
				<CreateChannelComponent />
			</div>
			<div className='flex gap-0 flex-col overflow-y-auto'>
				<UserChannels />
			</div>
		</div>
	)
}


export default ChannelTab;
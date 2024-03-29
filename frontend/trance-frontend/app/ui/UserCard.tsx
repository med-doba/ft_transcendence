"use client"
import type { FC } from 'react';
import Image from 'next/image'
import { ChannelUser } from '../interfaces/interfaces';
import { IconWithTooltip } from './CustomIcons';
import { HiDotsVertical } from "react-icons/hi";
import UserDropDown from './UserDropDown';

interface UserCardProps {
	user: ChannelUser;
	userRole: string | undefined;
}

const UserCard: FC<UserCardProps> = ({user, userRole}) => {
		return (
		<div className='w-full h-11 mb-1 text-black flex gap-2 justify-between items-center'>
			<Image
				unoptimized={process.env.NEXT_PUBLIC_ENVIRONMENT !== "PRODUCTION"}
				src={user.userPicture as string}
				alt='user Image'
				width='45'
				height='45'
				className='rounded-full bg-teal-300 max-w-[35px] max-h-[35px] min-w-[35px] min-h-[35px]'
			/>
			<div className='flex bg-teal-100 rounded-xl items-center p-2 w-full h-full justify-between'>
				<h1 className='font-bold text-xl'>
					{user.username}
				</h1>
				<UserDropDown
					userRole={userRole}
					userCardRole={user.channelRole as string}
					userNick={user.username as string}
					userId={user.userId}
				/>
			</div>
		</div>
	);
}
export default UserCard;

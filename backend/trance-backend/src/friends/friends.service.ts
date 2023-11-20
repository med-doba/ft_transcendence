import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { gatewayUser } from 'src/classes/classes';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { Socket , Server} from 'socket.io';
import { RequestType, UserStatus } from '@prisma/client';

@Injectable()
export class FriendsService {
	constructor(private jwtService: JwtService,
				private userService: UserService){}

	private Users: gatewayUser[] = [];


	sendWebSocketError(client: Socket, errorMessage: string, exit: boolean)
	{
		client.emit('error', { message: errorMessage });
		if (exit == true)
			client.disconnect();
	}

	async saveUser(client: Socket) {
		
		let user;
		try {
			const token: string = client.handshake.headers.token as string;
			const payload = await this.jwtService.verifyAsync(token, { secret: process.env.jwtsecret })
			user = await this.userService.findOneById(payload.sub);
			await this.userService.updateStatus(user.id, UserStatus.ONLINE)
			this.Users.push({ id: user.id, socket: client });
			await this.emitToFriendsStatus(user.id);
		}
		catch (error)
		{
			this.sendWebSocketError(client, "User not found", true)
			return;
		}
		try {
			await this.emitNotifications(client, user.id);
		}
		catch(error)
		{
			this.sendWebSocketError(client, error.message, false)
		}
	}

	async emitNotifications(client: Socket, id: string)
	{
		const notifications = await this.userService.getNotifications(id);
		if (notifications.length === 0)
			return ;

		client.emit('notification', `You have ${notifications.length} new notifications`)
	}

	async emitToFriendsStatus(id: string)
	{
		const friends = await this.userService.getFriends(id);
		for (const friend of friends) {
		  const friendUser = this.getUserById(friend.friendId);
		  if (friendUser) {
			friendUser.socket.emit('statusChange', { id: friendUser.id, status: "ONLINE" });
		  }
		}
	}



	async deleteUser(client: Socket) {
		try {
			const user = this.getUserBySocketId(client.id);
			await this.userService.updateStatus(user.id, UserStatus.OFFLINE)
			this.Users = this.Users.filter((u) => u.socket.id !== client.id);
			await this.emitToFriendsStatus(user.id);
		}
		catch (error)
		{
			this.sendWebSocketError(client, "Error on disconnecting", true)
		}
	}



	async sendRequest(client: Socket, userId: string)
	{
		const toSend = this.getUserById(userId);
		const sender = this.getUserBySocketId(client.id);
		try {
			const requestId = await this.userService.saveRequest(sender.id, userId);
			if (toSend !== undefined)
			{
				const notif = await this.userService.generateNotifData(requestId);
				toSend.socket.emit('notification', notif);
			}
			client.emit('request-sent', 'Friend request sent successfully');
		}
		catch(error)
		{
			this.sendWebSocketError(sender.socket, error.message, false);
		}

	}

	async deleteRequest(client: Socket, userId: string)
	{
		const toSend = this.getUserById(userId);
		const sender = this.getUserBySocketId(client.id);
		try {
			const requestId = await this.userService.deleteRequest(sender.id, userId);
			if (toSend !== undefined)
			{
				const notif = await this.userService.generateNotifData(requestId);
				toSend.socket.emit('notification', notif);
			}
			client.emit('request-sent', 'Unfriend request sent successfully');
		}
		catch(error)
		{
			this.sendWebSocketError(sender.socket, error.message, false);
		}
	}



	async refuseRequest(client: Socket, userId: string, requestId: string)
	{
		const toSend = this.getUserById(userId);
		const sender = this.getUserBySocketId(client.id);
		try {
			await this.userService.refuseRequest(sender.id, userId, requestId);
			if (toSend !== undefined)
			{
				const nick = await this.userService.getNickById(sender.id)
				toSend.socket.emit('request-refused', `${nick} refused your request`);
			}
		}
		catch(error)
		{
			this.sendWebSocketError(sender.socket, error.message, false);
		}
	}



	async acceptRequest(client: Socket, userId: string, requestId: string)
	{
		const toSend = this.getUserById(userId);
		const sender = this.getUserBySocketId(client.id);
		try {
			await this.userService.acceptRequest(sender.id, userId, requestId);
			if (toSend !== undefined)
			{
				const nick = await this.userService.getNickById(sender.id)
				toSend.socket.emit('request-accepted', `${nick} accepted your request`);
			}
		}
		catch(error)
		{
			this.sendWebSocketError(sender.socket, error.message, false);
		}
	}

	getUserBySocketId(socketId: string): gatewayUser | undefined {
	  return this.Users.find((user) => user.socket.id === socketId);
	}

	getUserById(userId: string): gatewayUser | undefined {
	  return this.Users.find((user) => user.id === userId);
	}

}

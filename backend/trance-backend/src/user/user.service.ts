import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { authenticator } from 'otplib';
import { UserStatus } from '@prisma/client';
import { isStrongPassword } from 'src/utils/passwordStrength';
import { compareHash, hashPass } from 'src/utils/bcryptUtils';

@Injectable()
export class UserService {

	constructor(private readonly prisma: PrismaService){}

  	async findOneByLogin(login: string) {
    const user = await this.prisma.user.findUnique({
			where: {
				login,
			},
		})
		return user;
  }



	async findOneByIntraId(intraId: number)
	{
		const user = await this.prisma.user.findUnique({
			where: {
				intraId: intraId,
			}
		})
		return user;
	}

	async findOneById(Id: number)
	{
		const user = await this.prisma.user.findUnique({
			where: {
				id: Id,
			}
		})
		return user;
	}



	async findOneByNickname(nick: string)
	{
		const user = await this.prisma.user.findUnique({
			where: {
				nickname: nick,
			}
		})
		return user;
	}



	async create(userData: any)
	{
		await this.prisma.user.create({
			data: {
			intraId: userData.intraId,
			email: userData.email,
			login: userData.login,
			// password: hashedPass,
			firstName: userData.firstName,
			lastName: userData.lastName,
			profilePic: userData.profilePic,
			BackgroundPic: userData.BackgroundPic,
			wallet: userData.wallet,
			level: userData.level,
			grade: userData.grade,
			status: UserStatus.ONLINE,
			token: null,
			nickname: "newUser",
			}
		})
	}


	async updateToken(id: number, token: string)
	{
		await this.prisma.user.update({
			where:{
				id: id,
			},
			data: {
				token: token,
			}
		})
	}

	async getSecret(id: number)
	{
		const secret = await this.prisma.user.findUnique({
			where:{
				id,
			},
			select: {
				Secret: true
			}
		})

		return secret.Secret;
	}


		async changePassword(newPass : string, id : number, oldPass: string) {
		// console.log("pass == ", newPass)
		// console.log("login == ", login)
		// const user = await this.findOneByLogin(login);
		  if (!isStrongPassword(newPass)) {
			throw new BadRequestException('Password does not meet strength requirements');
		}
		const user = await this.findOneById(id);

		if (!user)
			throw new UnauthorizedException("No User Found")
	
		const isMatch = await compareHash(oldPass,user.password);
		if (isMatch == false)
			throw new UnauthorizedException('Wrong Crendentiels')

		const hashedPass = await hashPass(newPass);
		// const hashedPass = newPass;
		await this.prisma.user.update({
			where: {
				id:id,
			},
			data: {
				password: hashedPass
			}
		})
		return {valid: true}
	}




		async changeNickname(newNick : string, id: number) {
		// console.log("login == ", login)
		// console.log("newNick == ", newNick);
		
		// const user = await this.findOneByLogin(login);
		const isunique = await this.findOneByNickname(newNick);
		if (isunique)
			throw new BadRequestException('nickname already taken')
	
		const user = await this.findOneById(id)

		if (!user)
			throw new BadRequestException("user doesn't exist")

		await this.prisma.user.update({
			where: {
				id: id
			},
			data: {
				nickname: newNick
			}
		})
		return {nick: newNick}

	}


	async privateProfile(id: number) {
    	const user = await this.prisma.user.findUnique({
			where: {
				id: id,
			},
			select: {
			id: true,
			nickname: true,
			login:true,
			wallet: true,
			grade:true,
			profilePic: true,
			BackgroundPic: true,
			level: true,
			status: true,
			isEnabled: true,
			},
		})
		return user;
  }


	async publicProfile(id: string) {
    	const user = await this.prisma.user.findUnique({
			where: {
				login: id,
			},
			select: {
			id: true,
			nickname: true,
			login:true,
			wallet: true,
			grade:true,
			profilePic: true,
			BackgroundPic: true,
			level: true,
			status: true,
			},
		})
		return user;
  }



	async enableTwoFA(login: string, id: number)
	{
		console.log("enabling")
		const secret = authenticator.generateSecret();
		const url = authenticator.keyuri(login,'Pong',secret);
		await this.prisma.user.update({
			where: {
				id: id,
			},
			data: {
				isEnabled: true,
				Secret: secret,
				otpauth_url: url
			}
		})
		return {valid:true, img: url}
	}

	async disableTwoFA(id: number)
	{
		console.log("disabling")
		await this.prisma.user.update({
			where: {
				id: id,
			},
			data: {
				isEnabled: false,
				Secret: null,
				otpauth_url: null
			}
		})
		return {valid:false}
	}

}

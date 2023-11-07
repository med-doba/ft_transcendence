import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-42";
import { PrismaClient } from '@prisma/client'
// import { UsersService } from "src/users/users.service";
import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
// import { CreateUserDto } from "src/users/dto/create-user.dto";
// import { CreateTodoDto } from "src/todo/dto/create-todo.dto";

@Injectable()
export class Strategy42 extends PassportStrategy(Strategy, '42') {

	constructor(private readonly usersService: UserService,
				private readonly authService: AuthService) {
		super({
			clientID: process.env.client_id,
			clientSecret: process.env.client_secret,
			callbackURL: process.env.callback_url,
		})
	}

	// extract the info from the profile object provided by the oauth
	extractUserData(profile: any, accessToken: string) {

		console.log("accessToken == ", accessToken)
	  const user = {
    intraId: profile._json.id,
    email: profile._json.email,
    login: profile._json.login,
    firstName: profile._json.first_name,
    lastName: profile._json.last_name,
    profilePic: profile._json.image.link,
	BackgroundPic: process.env.BackendHost + "/upload/DefaultBackground.jpg",
    wallet: profile._json.wallet,
    level: profile._json.cursus_users[1].level,
    grade: profile._json.cursus_users[1].grade,
	// isEnabled: false,
	// Secret: null,
	// otpauth_url: null,
	// nickname: "newUser"
  };
  return user;
}

	// this function is called by the oauth
	async validate(accessToken: string, refreshToken: string, profile: any, cb: Function)
				//stayed for a week	,  stayed for a month use it to generate a new accessToken
	{
		const user = this.extractUserData(profile, accessToken);
		let userExits: any = await this.usersService.findOneByIntraId(user.intraId);
		if (!userExits)
		{
			userExits = await this.usersService.create(user)
			const token = await this.authService.createToken(userExits.id, userExits.login)
			userExits = await this.usersService.updateToken(userExits.id, token)
			// userExits.token = token;;
		}
		return cb(null, userExits);
	}
}

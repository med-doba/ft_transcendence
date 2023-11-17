import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-42";
import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";

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

	extractUserData(profile: any, accessToken: string) {
<<<<<<< HEAD

		console.log("accessToken == ", accessToken)
	  const user = {
    intraId: profile._json.id,
    email: profile._json.email,
    login: profile._json.login,
    firstName: profile._json.first_name,
    lastName: profile._json.last_name,
    profilePic: profile._json.image.link,
    wallet: profile._json.wallet,
    level: profile._json.cursus_users[1].level,
    grade: profile._json.cursus_users[1].grade,
	// isEnabled: false,
	// Secret: null,
	// otpauth_url: null,
	// nickname: "newUser"
  };
  return user;
=======
		const user = {
			intraId: profile._json.id,
			email: profile._json.email,
			login: profile._json.login,
			password: "123",
			firstName: profile._json.first_name,
			lastName: profile._json.last_name,
			profilePic: profile._json.image.link,
			BackgroundPic: process.env.BackendHost + "/upload/DefaultBackground.jpg",
			wallet: profile._json.wallet,
			level: profile._json.cursus_users[1].level,
			grade: profile._json.cursus_users[1].grade,
		  };
		return user;
>>>>>>> origin/profileBackend
}

	async validate(accessToken: string, refreshToken: string, profile: any, cb: Function)
	{
		const user = this.extractUserData(profile, accessToken);
		let userExits: any = await this.usersService.findOneByIntraId(user.intraId);
		if (!userExits)
			userExits = await this.usersService.create(user)
		return cb(null, userExits);
	}
}

import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { intraAuthGuard } from './42.guard';
import { authDto } from './Dto/authDto';
import { tokenDto } from './Dto/tokenDto';
import { JwtAuthGuard } from './jwt.guard';
import { REFRESHEXP, REFRESHSECRET, TOKENEXP, TOKENSECRET } from 'src/classes/classes';
import { RefreshJwtAuthGuard } from './refresh.guard';
import { getId } from 'src/utils/getId';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}



	@Post('signin')
	async signIn(@Body() payload : authDto,  @Res() res)
	{
		return await this.authService.signIn(payload.username, payload.password, res);
	}

	@Get('42')
	@UseGuards(intraAuthGuard)
	intra42Auth(){}

	@Get('42/callback')
	@UseGuards(intraAuthGuard)
	async intra42AuthRedirect(@Req() request, @Res() response)
	{
		response.cookie('id', request.user.id, {signed: true})
		if (request.user.isEnabled === true)
		{
			response.redirect(`${process.env.FrontendHost}/Qr`);
			return;
		}
		const token = await this.authService.createToken(request.user.id, request.user.nickname, TOKENEXP, TOKENSECRET)
		const refresh = await this.authService.createToken(request.user.id, request.user.nickname, REFRESHEXP, REFRESHSECRET)
		response.cookie('token', token, {maxAge: TOKENEXP * 1000})
		response.cookie('refresh', refresh, {maxAge: REFRESHEXP * 1000})
		if (request.user.FirstLogin === true)
			response.redirect(`${process.env.FrontendHost}/settings`);
		response.redirect(`${process.env.FrontendHost}/Dashboard`);
	}

	@UseGuards(JwtAuthGuard)
	@Get('signout')
	signOut(@Res() res)
	{
		return this.authService.signOut(res)
	}


	@UseGuards(JwtAuthGuard)
	@Get('CheckToken')
	CheckToken(@Res() res)
	{
		res.status(200).send({message: "true"})
	}


	@UseGuards(JwtAuthGuard)
	@Get('CheckFirstLogin')
	async CheckFirstLogin(@Req() request)
	{
		const id = getId(request);
		return await this.authService.checkFirstLogin(id);
	}

	@UseGuards(JwtAuthGuard)
	@Post('UpdateFirstLogin')
	async UpdateFirstLogin(@Req() request)
	{
		const id = getId(request);
		return await this.authService.updateFirstLogin(id);
	}

	@UseGuards(RefreshJwtAuthGuard)
	@Get('refresh')
	refreshTokens(@Req() req, @Res() res)
	{
		return this.authService.refreshTokens(req, res);
	}


}


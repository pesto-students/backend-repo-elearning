import { Body, Controller, HttpCode, HttpStatus, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service'; 
import { PassportLocalGuard } from './guards/passport.local.guard';
import { PassportJwtAuthGuard } from './guards/passport-jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UseGuards(PassportLocalGuard)
    async login(@Request() request){
        return this.authService.signIn(request.user);
    }

    @Post('profile')
    @UseGuards(PassportJwtAuthGuard)
    async getUserInfo(@Request() request){
        return request.user;
    }
}

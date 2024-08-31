import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import { PassportJwtAuthGuard } from "src/auth/guards/passport-jwt.guard";

@Controller('user')

export class UserController{
    constructor(
        private userService: UserService
    ){}

    @UseGuards(PassportJwtAuthGuard)
    @Get('whoami')
    whoAmI(@Request() req) {
       return req.user;
    }

    @Post('type/create')
    async createUserType(@Body() userTypeDto){
        return await this.userService.createUserType(userTypeDto);
    }

    @Get('type/fetch')
    async fetchUserType(){
        return;
    }

}
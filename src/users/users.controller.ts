import { Body, Controller, Get, Post, Request } from "@nestjs/common";
import { UserService } from "./users.service";

@Controller('user')

export class UserController{
    constructor(
        private userService: UserService
    ){}

    @Post('type/create')
    async createUserType(@Body() userTypeDto){
        return await this.userService.createUserType(userTypeDto);
    }

    @Get('type/fetch')
    async fetchUserType(){
        return;
    }

}
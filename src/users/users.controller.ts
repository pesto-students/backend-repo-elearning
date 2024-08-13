import { Controller, Get, Post, Request } from "@nestjs/common";

@Controller()

export class UserController{
    @Get()
    async fetchUser(@Request() req){
        return "hii User";
    }
}
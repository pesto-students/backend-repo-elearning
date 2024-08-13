import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
 import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return "helo"
   }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req){
    return req.user;
  }
}

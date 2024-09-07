import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import { PassportJwtAuthGuard } from "src/auth/guards/passport-jwt.guard";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags('User')
@Controller('user')

export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @UseGuards(PassportJwtAuthGuard)
    @Get('whoami')
    @ApiOperation({ summary: 'Get current user information' })
    @ApiBearerAuth()
    whoAmI(@Request() req) {
        return req.user;
    }

    @Post('type/create')
    @ApiOperation({ summary: 'Create a new user type' })
    async createUserType(@Body() userTypeDto) {
        return await this.userService.createUserType(userTypeDto);
    }

    @Get('type/fetch')
    @ApiOperation({ summary: 'Fetch user types' })
    async fetchUserType() {
        return;
    }

}
import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { PassportJwtAuthGuard } from "src/auth/guards/passport-jwt.guard";
import { AiChatService } from "./ai-chat.service";

@ApiTags('AiChat')
@UseGuards(PassportJwtAuthGuard)
@Controller('chat')

export class AiChatController{
    constructor(
        private readonly aiChatService: AiChatService
    ){}

    @Post('create')
    @ApiResponse({ status: 201, description: 'The chat has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    async create(@Body() chatData, @Request() request){
        return await this.aiChatService.create(chatData,request);
    }
}
import { Injectable } from "@nestjs/common";
import { AiChatRepository } from "./repository/ai-chat.repository";
import { Types } from "mongoose";
import { ApiResponseDto } from "src/core/dto/api-response.dto";

@Injectable()
export class AiChatService{
    constructor(
        private readonly aiChatRepository: AiChatRepository
    ){}

    async create(chatData, request){

        chatData = {
            ...chatData,
            branchId: request.userSession.branchId,
            userAuthId: request.userSession.userId
        };

        const res: string = await this.aiChatRepository.create(chatData);

        if(Types.ObjectId.isValid(res)){
            return new ApiResponseDto(true, 'Chat created succesfully', chatData);
        }
        return new ApiResponseDto(false, 'Please try again');
    }

    async getChatHistory(request){
        const userId = new Types.ObjectId(request.userSession.userId);
        const branchId = new Types.ObjectId(request.userSession.branchId);

        const res = await this.aiChatRepository.fetch(branchId, userId);
        
        if(res){
            return new ApiResponseDto(true, 'Chat Fetch succesfully', res);
        }
        return new ApiResponseDto(false, 'Please try again');
    }
}
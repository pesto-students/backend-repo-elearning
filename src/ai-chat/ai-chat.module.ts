import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "src/users/user.module";
import { AuthModule } from "src/auth/auth.module";
import { AiChatController } from "./ai-chat.controller";
import { AiChatService } from "./ai-chat.service";
import { AiChatRepository } from "./repository/ai-chat.repository";
import { ChatHistory, chatHistorySchema } from "src/core/schemas/chat-history.schema";

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name: ChatHistory.name,
                schema: chatHistorySchema
            }
        ]),
        UserModule,
        AuthModule
    ],
    providers:[AiChatService, AiChatRepository],
    controllers:[AiChatController],
    exports:[AiChatService]
})

export class AiChatModule{}
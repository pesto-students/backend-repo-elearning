import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { ChatHistory } from "src/core/schemas/chat-history.schema";

@Injectable()
export class AiChatRepository {
    constructor(
        @InjectModel(ChatHistory.name) private chatHistoryModel: Model<ChatHistory>
    ) { }

    async create(chatdata): Promise<string> {

        const createChat = await this.chatHistoryModel.create(chatdata);

        if (Types.ObjectId.isValid(createChat[0]._id.toString())) {
            return createChat[0]._id.toString();
        }

        return null;

    }

    async upsertEntity(
        branchId: string,
        userAuthId: string,
        title: string,
        data: Record<string, any>
      ): Promise<ChatHistory> {
        const filter = { branchId, userAuthId };
        const update = { title, data };
        // Perform the upsert operation
        return this.chatHistoryModel.findOneAndUpdate(
          filter,
          update,
          { new: true, upsert: true }
        ).exec();
      }

    async fetch(branchId: Types.ObjectId, userAuthId: Types.ObjectId) {
        const chatHistories = await this.chatHistoryModel.find({
            branchId: branchId,
            userAuthId: userAuthId
        }).exec();

        return chatHistories;
    }
}
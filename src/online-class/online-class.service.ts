import { Injectable } from "@nestjs/common";
import { OnlineClassRepository } from "./repository/online-class.respository";
import { OnlineClassDto } from "./dto/online-class.dto";
import { GetOnlineClassQueryDto } from "./dto/get-online-class-query.dto";
import { Teacher } from "src/core/schemas/teacher.schema";

@Injectable()
export class OnlineClassService{
    constructor(
        private onlineClassRepository: OnlineClassRepository
    ){}

    async createOnlineClass(onlineClassDto: OnlineClassDto) {
        return await this.onlineClassRepository.create(onlineClassDto);
    }

    async fetchOnlineClass(condition: GetOnlineClassQueryDto): Promise<Teacher[]> {
        return await this.onlineClassRepository.fetchOnlineClassWithDetails(condition);
    }
}
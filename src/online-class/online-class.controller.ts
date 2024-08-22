import { Body, Controller, Post } from "@nestjs/common"; 
import { OnlineClassService } from "./online-class.service";
import { OnlineClassDto } from "./dto/online-class.dto";
import { GetOnlineClassQueryDto } from "./dto/get-online-class-query.dto";

@Controller('onlineClass')
export class OnlineClassController {

    constructor(private onlineClassService: OnlineClassService) { }

    @Post('create')
    async createOnlineClass(@Body() onlineClassDto: OnlineClassDto) {
        return await this.onlineClassService.createOnlineClass(onlineClassDto);
    }

    @Post('fetch')
    async fetchOnlineClass(@Body() condition: GetOnlineClassQueryDto) {
        return await this.onlineClassService.fetchOnlineClass(condition);
    }

}

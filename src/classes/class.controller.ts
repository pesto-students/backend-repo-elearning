import { Body, Controller, Post } from "@nestjs/common";
import { ClassService } from "./class.service";
import { ClassDto } from "./dto/class.dto";
import { GetClassQueryDto } from "./dto/get-class-query.dto";

@Controller('class')
export class ClassController{
    constructor(private classService: ClassService){}

    @Post('create')
    async createClass(@Body() classDto: ClassDto){
        return this.classService.create(classDto);
    }

    @Post('fetch')
    async fetchBranch(@Body() condition: GetClassQueryDto){
        return await this.classService.fetchClass(condition);
    }
}
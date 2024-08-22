import { Body, Controller, Post } from "@nestjs/common";
import { CreateTeacherDto, GetTeacherQueryDto } from "./dto/teacher.dto";
import { TeacherService } from "./teacher.service";

@Controller('teacher')
export class TeacherController{

    constructor(private teacherService: TeacherService){}

    @Post('create')
    async AddTeacher(@Body() teacherDto: CreateTeacherDto){
        return await this.teacherService.CreateTeacher(teacherDto);
    }

    @Post('fetch')
    async fetchTeacher(@Body() condition: GetTeacherQueryDto){
      return await this.teacherService.fetchTeacher(condition);
    }

}
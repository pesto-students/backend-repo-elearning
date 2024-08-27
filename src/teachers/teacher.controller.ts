import { Body, Controller, Get, Post, UseGuards, Request } from "@nestjs/common";
import { CreateTeacherDto, GetTeacherQueryDto } from "./dto/teacher.dto";
import { TeacherService } from "./teacher.service";
import { PassportJwtAuthGuard } from "src/auth/guards/passport-jwt.guard";

@UseGuards(PassportJwtAuthGuard)
@Controller('teacher')
export class TeacherController {

    constructor(private teacherService: TeacherService) { }
    
    @Post('create')
    async AddTeacher(@Body() teacherDto: CreateTeacherDto, @Request() request) {
        console.log("REuest: ", request.user);
        return await this.teacherService.CreateTeacher(teacherDto);
    }

    @Post('fetch')
    async fetchTeacher(@Body() condition: GetTeacherQueryDto) {
        return await this.teacherService.fetchTeacher(condition);
    }
 
}

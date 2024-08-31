import { Body, Controller, Get, Post, UseGuards, Request, Put } from "@nestjs/common";
import { CreateTeacherDto, GetTeacherQueryDto, UpdateTeacherDto } from "./dto/teacher.dto";
import { TeacherService } from "./teacher.service";
import { PassportJwtAuthGuard } from "src/auth/guards/passport-jwt.guard";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
 
@ApiTags('Teachers')
@UseGuards(PassportJwtAuthGuard)
@Controller('teacher')
export class TeacherController {

    constructor(private teacherService: TeacherService) { }

    @Post('create')
    @ApiOperation({ summary: 'Create a new teacher' })
    @ApiResponse({ status: 201, description: 'The teacher has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiBody({ type: CreateTeacherDto })
    async AddTeacher(@Body() teacherDto: CreateTeacherDto, @Request() request) {
        return await this.teacherService.CreateTeacher(teacherDto, request);
    }

    @Post('fetch')
    @ApiOperation({ summary: 'Fetch teachers' })
    @ApiResponse({ status: 200, description: 'Returns the list of teachers.' })
    @ApiBody({ type: GetTeacherQueryDto })
    async fetchTeacher(@Body() condition: GetTeacherQueryDto, @Request() request) {
        return await this.teacherService.fetchTeacher(condition);
    }

    @Post('update')
    @ApiOperation({ summary: 'Update a teacher' })
    @ApiResponse({ status: 200, description: 'The teacher has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'Teacher not found.' })
    @ApiBody({ type: UpdateTeacherDto })
    async updateTeacher(@Body() updateTeacherDto: UpdateTeacherDto) {
        return await this.teacherService.updateTeacher(updateTeacherDto);
    }
}

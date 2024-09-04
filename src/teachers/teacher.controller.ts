import { Body, Controller, Get, Post, UseGuards, Request, Put } from "@nestjs/common";
import { CreateTeacherDto, GetTeacherQueryDto, UpdateTeacherDto, UpdateTeacherEnrollmentsDto, FetchTeacherClassesDto, DeleteTeachersDto } from "./dto/teacher.dto";
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

    @Post('update-enrollments')
    @ApiOperation({ summary: 'Update teacher enrollments' })
    @ApiResponse({ status: 200, description: 'Teacher enrollments updated successfully.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiBody({ type: UpdateTeacherEnrollmentsDto })
    async updateTeacherEnrollments(@Body() updateEnrollmentsDto: UpdateTeacherEnrollmentsDto) {
        return await this.teacherService.updateTeacherEnrollments(updateEnrollmentsDto);
    }

    @Post('fetch-classes')
    @ApiOperation({ summary: 'Fetch classes for a teacher' })
    @ApiResponse({ status: 200, description: 'Returns the list of classes for the teacher.' })
    @ApiBody({ type: FetchTeacherClassesDto })
    async fetchTeacherClasses(@Body() fetchTeacherClassesDto: FetchTeacherClassesDto) {
        return await this.teacherService.fetchTeacherClasses(fetchTeacherClassesDto.teacherId);
    }

    @Post('delete')
    @ApiOperation({ summary: 'Delete multiple teachers' })
    @ApiResponse({ status: 200, description: 'Teachers deleted successfully.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiBody({ type: DeleteTeachersDto })
    async deleteTeachers(@Body() deleteTeachersDto: DeleteTeachersDto) {
        return await this.teacherService.deleteTeachers(deleteTeachersDto.teacherIds);
    }
}

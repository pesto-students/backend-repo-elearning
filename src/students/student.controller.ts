import { Body, Controller, Get, Post, Put, Param } from "@nestjs/common";
import { StudentService } from "./student.service";
import { StudentDto } from "./dto/student.dto";
import { DbQueryConditionDto } from "./dto/db-query-condition.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags('Students')
@Controller('student')
export class StudentController {

    constructor(private studentService: StudentService) { }

    @Post('create')
    @ApiOperation({ summary: 'Create a new student' })
    @ApiResponse({ status: 201, description: 'The student has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    async AddStudent(@Body() studentDto: StudentDto) {
        return await this.studentService.CreateStudent(studentDto);
    }

    @Post('fetch')
    @ApiOperation({ summary: 'Fetch students based on conditions' })
    @ApiResponse({ status: 200, description: 'Returns the list of students.' })
    async fetchStudent(@Body() condition: DbQueryConditionDto) {
        return await this.studentService.fetchStudent(condition);
    }

    // @Put(':id')
    // @ApiOperation({ summary: 'Update a student' })
    // @ApiResponse({ status: 200, description: 'The student has been successfully updated.' })
    // @ApiResponse({ status: 404, description: 'Student not found.' })
    // async updateStudent(@Param('id') id: string, @Body() studentDto: StudentDto) {
    //     return await this.studentService.updateStudent(id, studentDto);
    // }
}

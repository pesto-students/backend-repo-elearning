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

  
}

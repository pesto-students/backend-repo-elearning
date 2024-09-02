import { Body, Controller, Get, Post, Put, Param, Request, UseGuards } from "@nestjs/common";
import { StudentService } from "./student.service";
import { SearchStudentDto, StudentDto } from "./dto/student.dto";
import { DbQueryConditionDto } from "./dto/db-query-condition.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from "@nestjs/swagger";
import { PassportJwtAuthGuard } from "src/auth/guards/passport-jwt.guard";

@ApiTags('Students')
@ApiBearerAuth() // This will allow passing the bearer token in the auth headers
@UseGuards(PassportJwtAuthGuard)
@Controller('student')
export class StudentController {

    constructor(private studentService: StudentService) { }

    @Post('create')
    @ApiOperation({ summary: 'Create a new student' })
    @ApiResponse({ status: 201, description: 'The student has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    async AddStudent(@Body() studentDto: StudentDto, @Request() request) {
        return await this.studentService.CreateStudent(studentDto, request);
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

    @Post('search')
    @ApiBody({
        description: 'Search for students based on a keyword and optional limit',
        examples: {
            a: {
                summary: 'Search without limit',
                value: { keyword: 'John' },
            },
            b: {
                summary: 'Search with limit',
                value: { keyword: 'John', limit: 10 },
            },
        },
    })
    async searchStudent(@Body() condition: SearchStudentDto) {
        return this.studentService.searchStudent(condition.keyword, condition?.limit);
    }
}

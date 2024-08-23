import { Body, Controller, Get, Post } from "@nestjs/common";
import { StudentService } from "./student.service";
import { StudentDto } from "./dto/student.dto";
import { DbQueryConditionDto } from "./dto/db-query-condition.dto";

@Controller('student')
export class StudentController {

    constructor(private studentService: StudentService) { }

    @Post('create')
    async AddStudent(@Body() studentDto: StudentDto) {
        return await this.studentService.CreateStudent(studentDto);
    }

    @Post('fetch')
    async fetchStudent(@Body() condition: DbQueryConditionDto) {
        return await this.studentService.fetchStudent(condition);
    }

    @Get('schema')
    getStudentSchemaMetadata() {
        return this.studentService.getSchemaMetadata();
    }

}

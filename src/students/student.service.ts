import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentDto } from './dto/student.dto';
import { DbQueryConditionDto } from './dto/db-query-condition.dto';
import { StudentRepository } from './repository/student.repository';

@Injectable()
export class StudentService {
    constructor(private studentRepository: StudentRepository) { }

    async CreateStudent(studentDto: StudentDto) {
        return await this.studentRepository.create(studentDto);
    }

    async fetchStudent(condition: DbQueryConditionDto) {
        return await this.studentRepository.fetchStudentWithDetails(condition);
    }

    // async updateStudent(id: string, studentDto: StudentDto) {
    //     const updatedStudent = await this.studentRepository.update(id, studentDto);
    //     if (!updatedStudent) {
    //         throw new NotFoundException(`Student with ID "${id}" not found`);
    //     }
    //     return updatedStudent;
    // }
}
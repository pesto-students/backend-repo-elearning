import { Injectable } from "@nestjs/common";
import { StudentRepository } from "./repository/student.repository";
import { StudentDto } from "./dto/student.dto";
import { DbQueryConditionDto } from "./dto/db-query-condition.dto";
import { Student } from "src/core/schemas/student.schema";
import { AbstractSchemaMetadataService } from "src/common/abstract-schema-metadata.service";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class StudentService extends AbstractSchemaMetadataService<Student>{
    constructor(
        private studentRepository: StudentRepository, 
        @InjectModel(Student.name) studentModel: Model<Student>){
            super(studentModel)
        }

    async CreateStudent(studentDto: StudentDto) {
        return await this.studentRepository.create(studentDto);
    }

    async fetchStudent(condition: DbQueryConditionDto): Promise<Student[]> {
        return await this.studentRepository.fetchStudentWithDetails(condition);
    }
}
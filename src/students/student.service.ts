import { Injectable } from "@nestjs/common";
import { StudentRepository } from "./repository/student.repository";
import { StudentDto } from "./dto/student.dto";
import { DbQueryConditionDto } from "./dto/db-query-condition.dto";
import { Student } from "src/core/schemas/student.schema";
import { AbstractSchemaMetadataService } from "src/common/abstract-schema-metadata.service";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthService } from "src/auth/auth.service";
import { UserService } from "src/users/users.service";

@Injectable()
export class StudentService{

    constructor(
        private studentRepository: StudentRepository,
        private authService: AuthService,
        private userService: UserService
    ){}

    async CreateStudent(studentDto: StudentDto) {
        const res = await this.studentRepository.create(studentDto);
        if(res){
            const verificationLink: string = await this.authService.createVerificationLink({name: studentDto.firstName, email: studentDto.email})
            await this.userService.sendWelcomeEmail({name: studentDto.firstName, email: studentDto.email});
            await this.userService.sendVerificationMail(
                {
                    name: studentDto.firstName, 
                    email: studentDto.email, 
                    verificationLink,
                    currentYear:  new Date().getFullYear()
                });
        }
    }

    async fetchStudent(condition: DbQueryConditionDto): Promise<Student[]> {
        return await this.studentRepository.fetchStudentWithDetails(condition);
    }
}
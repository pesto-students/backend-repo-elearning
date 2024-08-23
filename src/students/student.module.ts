import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Student, StudentSchema } from "src/core/schemas/student.schema";
import { StudentService } from "./student.service";
import { StudentRepository } from "./repository/student.repository";
import { StudentController } from "./student.controller";
import { Teacher, TeacherSchema } from "src/core/schemas/teacher.schema";

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name: Student.name,
                schema: StudentSchema
            },
        ])
    ],
    providers:[StudentService, StudentRepository],
    controllers:[StudentController],
})

export class StudentModule{}
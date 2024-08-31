import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Student, StudentSchema } from "src/core/schemas/student.schema";
import { StudentService } from "./student.service";
import { StudentRepository } from "./repository/student.repository";
import { StudentController } from "./student.controller";
import { Teacher, TeacherSchema } from "src/core/schemas/teacher.schema";
import { UserModule } from "src/users/user.module";
import { UserRepository } from "src/users/repository/user.repository";
import { UserType, userTypeSchema } from "src/core/schemas/user-type.schema";
import { Auth, AuthSchema } from "src/core/schemas/auth.schema";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name: Student.name,
                schema: StudentSchema
            },{
                name: UserType.name,
                schema: userTypeSchema
            },{
                name: Auth.name,
                schema: AuthSchema
            }
        ]),
        UserModule,
        AuthModule
    ],
    providers:[StudentService, StudentRepository],
    controllers:[StudentController],
    exports:[StudentService]
})

export class StudentModule{}
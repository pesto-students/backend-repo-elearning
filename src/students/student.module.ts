import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Student, StudentSchema } from "src/core/schemas/student.schema";
import { StudentService } from "./student.service";
import { StudentRepository } from "./repository/student.repository";
import { StudentController } from "./student.controller";
import { UserModule } from "src/users/user.module";
import { UserType, userTypeSchema } from "src/core/schemas/user-type.schema";
import { Auth, AuthSchema } from "src/core/schemas/auth.schema";
import { AuthModule } from "src/auth/auth.module";
import { StudentEnrollment, StudentEnrollmentSchema } from "src/core/schemas/student-enrollment.schema";
import { ModuleManagementModule } from "src/module-management/module-management.module";

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name: Student.name,
                schema: StudentSchema
            },
            {
                name: UserType.name,
                schema: userTypeSchema
            },
            {
                name: Auth.name,
                schema: AuthSchema
            },
            {
                name: StudentEnrollment.name,
                schema: StudentEnrollmentSchema
            }
        ]),
        UserModule,
        AuthModule,
        ModuleManagementModule
    ],
    providers:[StudentService, StudentRepository],
    controllers:[StudentController],
    exports:[StudentService]
})

export class StudentModule{}
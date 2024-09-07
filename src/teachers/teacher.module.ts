import { Module } from "@nestjs/common";
import { TeacherController } from "./teacher.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Teacher, TeacherSchema } from "src/core/schemas/teacher.schema";
import { City, CitySchema } from "src/core/schemas/city.schema";
import { Country, CountrySchema } from "src/core/schemas/country.schema";
import { State, StateSchema } from "src/core/schemas/state.schema";
import { TeacherService } from "./teacher.service";
import { TeacherRepository } from "./repository/teacher.repository";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "src/users/user.module";
import { TeacherEnrollment, TeacherEnrollmentSchema } from "src/core/schemas/teacher-enrollment.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Teacher.name,
                schema: TeacherSchema
            },
            {
                name: State.name,
                schema: StateSchema
            },
            {
                name: Country.name,
                schema: CountrySchema
            },
            {
                name: City.name,
                schema: CitySchema
            },
            {
                name: TeacherEnrollment.name,
                schema: TeacherEnrollmentSchema
            }
        ]),
        AuthModule,
        UserModule
    ],
    providers: [TeacherService, TeacherRepository],
    controllers: [TeacherController],
    exports: [TeacherService]
})

export class TeacherModule { }

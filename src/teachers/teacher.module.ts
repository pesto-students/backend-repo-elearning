import { Module } from "@nestjs/common";
import { TeacherController } from "./teacher.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Teacher, TeacherSchema } from "src/core/schemas/teacher.schema";
import { City, CitySchema } from "src/core/schemas/city.schema";
import { Country, CountrySchema } from "src/core/schemas/country.schema";
import { State, StateSchema } from "src/core/schemas/state.schema";
import { TeacherService } from "./teacher.service";
import { TeacherRepository } from "./repository/teacher.repository";

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
        ])
    ],
    providers: [TeacherService, TeacherRepository],
    controllers: [TeacherController],
    exports: [TeacherService]
})

export class TeacherModule { }

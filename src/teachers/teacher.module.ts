import { Module } from '@nestjs/common'
import { TeacherController } from "./teacher.controller";
import { TeacherService } from "./teacher.service";
import { TeacherRepository } from "./teacher.repository";
import { Teacher, TeacherSchema } from "src/core/schemas/teacher.schema";
import { MongooseModule } from '@nestjs/mongoose';
import { TeacherSchemaService } from './teacher.schema.service';
import { TeacherSchemaController } from './teacher.schema.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Teacher.name,
                schema: TeacherSchema
            }
        ]),
    ],
    controllers: [TeacherController,TeacherSchemaController],
    providers: [TeacherService, TeacherRepository, TeacherSchemaService]
})

export class TeacherModule {

}
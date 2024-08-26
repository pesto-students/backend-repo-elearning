import { Injectable } from "@nestjs/common";
import { CreateTeacherDto, GetTeacherQueryDto } from "./dto/teacher.dto";
import { TeacherRepository } from "./repository/teacher.repository";
import { Teacher } from "src/core/schemas/teacher.schema";
import { AbstractSchemaMetadataService } from "src/common/abstract-schema-metadata.service";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class TeacherService{
    constructor(
        private teacherRepository: TeacherRepository,
    ) {}

    async CreateTeacher(teacherDto: CreateTeacherDto) {
        return await this.teacherRepository.create(teacherDto);
    }

    async fetchTeacher(condition: GetTeacherQueryDto): Promise<Teacher[]> {
        return await this.teacherRepository.fetchTeacherWithDetails(condition);
    }
}

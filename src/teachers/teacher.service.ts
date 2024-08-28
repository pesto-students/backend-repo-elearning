import { Injectable } from "@nestjs/common";
import { CreateTeacherDto, GetTeacherQueryDto, UpdateTeacherDto } from "./dto/teacher.dto";
import { TeacherRepository } from "./repository/teacher.repository";
import { Teacher } from "src/core/schemas/teacher.schema";

@Injectable()
export class TeacherService {
    constructor(
        private teacherRepository: TeacherRepository,
    ) { }

    async CreateTeacher(teacherDto: CreateTeacherDto) {
        return await this.teacherRepository.create(teacherDto);
    }

    async fetchTeacher(condition: GetTeacherQueryDto): Promise<Teacher[]> {
        return await this.teacherRepository.fetchTeacherWithDetails(condition);
    }

    async updateTeacher(updateTeacherDto: UpdateTeacherDto): Promise<Teacher> {
        return await this.teacherRepository.update(updateTeacherDto);
    }
}

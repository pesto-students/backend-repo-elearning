import { Teacher } from 'src/core/schemas/teacher.schema';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { TeacherRepository } from './teacher.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TeacherService {
    constructor(private readonly teacherRepository: TeacherRepository) { }

    async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
        return this.teacherRepository.create(createTeacherDto);
    }

    async findAll(): Promise<Teacher[]> {
        return this.teacherRepository.findAll();
    }

    async findOne(id: string): Promise<Teacher> {
        return this.teacherRepository.findOne(id);
    }

    async update(id: string, updateTeacherDto: CreateTeacherDto): Promise<Teacher> {
        return this.teacherRepository.update(id, updateTeacherDto);
    }

    // async remove(id: string): Promise<any> {
    //     return this.teacherRepository.remove(id);
    // }
}

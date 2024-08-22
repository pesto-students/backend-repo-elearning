import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher } from '../core/schemas/teacher.schema';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Injectable()
export class TeacherRepository {
    constructor(@InjectModel(Teacher.name) private readonly teacherModel: Model<Teacher>) { }

    async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
        const createdTeacher = new this.teacherModel(createTeacherDto);
        return createdTeacher.save();
    }

    async findAll(): Promise<Teacher[]> {
        return this.teacherModel.find().exec();
    }

    async findOne(id: string): Promise<Teacher> {
        return this.teacherModel.findById(id).exec();
    }

    async update(id: string, updateTeacherDto: CreateTeacherDto): Promise<Teacher> {
        return this.teacherModel.findByIdAndUpdate(id, updateTeacherDto, { new: true }).exec();
    }

    // async remove(id: string): Promise<any> {
    //     return this.teacherModel.findByIdAndRemove(id).exec();
    // }
}

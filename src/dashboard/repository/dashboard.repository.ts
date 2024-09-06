import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher } from 'src/core/schemas/teacher.schema';
import { Student } from 'src/core/schemas/student.schema';
import { Class } from 'src/core/schemas/class.schema';
import { Parent } from 'src/core/schemas/parent.schema';
import { OnlineClass } from 'src/core/schemas/online-class.schema';

@Injectable()
export class DashboardRepository {
    constructor(
        @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
        @InjectModel(Student.name) private studentModel: Model<Student>,
        @InjectModel(Class.name) private classModel: Model<Class>,
        @InjectModel(Parent.name) private parentModel: Model<Parent>,
        @InjectModel(OnlineClass.name) private onlineClassModel: Model<OnlineClass>,
    ) { }

    async getDashboardCounts(condition: any) {
        const [teachers, students, classes, parents, onlineClasses] = await Promise.all([
            this.teacherModel.countDocuments(condition),
            this.studentModel.countDocuments(condition),
            this.classModel.countDocuments(condition),
            this.parentModel.countDocuments(condition),
            this.onlineClassModel.countDocuments(condition),
        ]);

        return {
            teachers: { label: "Teachers", count: teachers },
            students: { label: "Students", count: students },
            classes: { label: "Classes", count: classes },
            parents: { label: "Parents", count: parents },
            onlineClasses: { label: "Online Classes", count: onlineClasses },
        };
    }
}
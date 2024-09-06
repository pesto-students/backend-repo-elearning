import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { DashboardRepository } from './repository/dashboard.repository';
import { Teacher, TeacherSchema } from 'src/core/schemas/teacher.schema';
import { Student, StudentSchema } from 'src/core/schemas/student.schema';
import { Class, ClassSchema } from 'src/core/schemas/class.schema';
import { Parent, ParentSchema } from 'src/core/schemas/parent.schema';
import { OnlineClass, OnlineClassSchema } from 'src/core/schemas/online-class.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Teacher.name, schema: TeacherSchema },
      { name: Student.name, schema: StudentSchema },
      { name: Class.name, schema: ClassSchema },
      { name: Parent.name, schema: ParentSchema },
      { name: OnlineClass.name, schema: OnlineClassSchema },
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService, DashboardRepository],
})
export class DashboardModule { }

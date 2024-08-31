import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { BaseSchema, BaseSchemaOptions } from './base.schema';
import { Student } from './student.schema';
import { StudentRoutes } from 'src/students/student.routes';
import { Class } from './class.schema';
import { Branch } from './branch.schema';
import { Teacher } from './teacher.schema';
import { TeacherRoutes } from 'src/teachers/teacher.routes';

@BaseSchemaOptions()
export class TeacherEnrollment extends BaseSchema {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true })
  branchId: Branch;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true, formControl: { name: 'autosuggest', label: "Select Teacher", required: true, apiDetails: { endpoint: TeacherRoutes.FETCH_TEACHER, onMount: true } } })
  teacherId: Teacher;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true,
    formControl: { name: 'autosuggest', label: 'Select Class', required: true }
   })
  classId: Class;

  @Prop({ type: Date, required: true, formControl: {name:'date', label:'Enrollment Date', required: true} })
  enrollmentDate: Date;
}

export const TeacherEnrollmentSchema = SchemaFactory.createForClass(TeacherEnrollment);

import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BaseSchema, BaseSchemaOptions } from './base.schema';
import { Class } from './class.schema';
import { Branch } from './branch.schema';
import { Teacher } from './teacher.schema';
import { TeacherRoutes } from 'src/teachers/teacher.routes';
import { DbStatusEnum } from '../enums/status.enum';
import { TeacherRoleEnum } from '../enums/roles.enum';

@BaseSchemaOptions()
export class TeacherEnrollment extends BaseSchema {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true })
  branchId: Branch;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true, formControl: { name: 'autosuggest', label: "Select Teacher", required: true, apiDetails: { endpoint: TeacherRoutes.FETCH_TEACHER, onMount: true } } })
  teacherId: Teacher;

  @Prop({
    type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: false,
    formControl: { name: 'autosuggest', label: 'Select Class', required: false }
  })
  classId: Class;

  @Prop({ type: String, required: true, default: DbStatusEnum.ACTIVE })
  status: string;

  @Prop({ type: String, required: true, default: TeacherRoleEnum.PRIMARY })
  role: string;

  @Prop({ type: Date, required: true, formControl: { name: 'date', label: 'Enrollment Date', required: true } })
  enrollmentDate: Date;

  @Prop({ type: Date })
  enrollmentEndDate: Date;
}

export const TeacherEnrollmentSchema = SchemaFactory.createForClass(TeacherEnrollment);

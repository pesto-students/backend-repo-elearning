import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { BaseSchema, BaseSchemaOptions } from './base.schema';
import { Student } from './student.schema';
import { StudentRoutes } from 'src/students/student.routes';
import { Class } from './class.schema';

@BaseSchemaOptions()
export class Enrollment extends BaseSchema {

  @Prop({ type: Types.ObjectId, ref: 'Branch', required: true })
  branchId: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, formControl: { name: 'autosuggest', label: "Select Student", required: true, apiDetails: { endpoint: StudentRoutes.FETCH_STUDENT, onMount: true } } })
  studentId: Student;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true,
    formControl: { name: 'autosuggest', label: 'Select Class', required: true }
   })
  classId: Class;

  @Prop({ type: Date, required: true, formControl: {name:'date', label:'Enrollment Date', required: true} })
  enrollmentDate: Date;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { BaseSchema, BaseSchemaOptions } from './base.schema';
import { Student } from './student.schema';
import { StudentRoutes } from 'src/students/student.routes';
import { Class } from './class.schema';
import { Branch } from './branch.schema';

@BaseSchemaOptions()
export class StudentEnrollment extends BaseSchema {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true })
  branchId: Branch;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, formControl: { name: 'autosuggest', label: "Select Student", required: true, apiDetails: { endpoint: StudentRoutes.FETCH_STUDENT, onMount: true } } })
  studentId: Student;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true,
    formControl: { name: 'autosuggest', label: 'Select Class', required: true }
   })
  classId: Class;

  @Prop({ type: Date, required: true, formControl: {name:'date', label:'Enrollment Date', required: true} })
  enrollmentDate: Date;

  @Prop({ type: Date })
  enrollmentEndDate: Date;
}

export const StudentEnrollmentSchema = SchemaFactory.createForClass(StudentEnrollment);

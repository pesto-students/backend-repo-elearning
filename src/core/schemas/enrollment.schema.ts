import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Enrollment extends Document {
  
  @Prop({ type: Types.ObjectId, ref: 'Branch', required: true })
  branchId: Types.ObjectId;
  
  @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
  studentId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Class', required: true })
  classId: Types.ObjectId;

  @Prop({ type: Date, required: true })
  enrollmentDate: Date;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);

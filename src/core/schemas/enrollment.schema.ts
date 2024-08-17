import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Enrollment extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
  StudentID: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Class', required: true })
  ClassID: Types.ObjectId;

  @Prop({ type: Date, required: true })
  EnrollmentDate: Date;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);

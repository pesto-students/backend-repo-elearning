import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class QuestionPaper extends Document { 

  @Prop({ type: Types.ObjectId, ref: 'Branch', required: true })
  branchId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Teacher', required: true })
  teacherId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Class', required: true })
  classId: Types.ObjectId;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String })
  fileUrl: string;
}

export const QuestionPaperSchema = SchemaFactory.createForClass(QuestionPaper);

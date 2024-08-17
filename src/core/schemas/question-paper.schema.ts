import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class QuestionPaper extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Teacher', required: true })
  TeacherID: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Class', required: true })
  ClassID: Types.ObjectId;

  @Prop({ type: String, required: true })
  Title: string;

  @Prop({ type: String })
  FileURL: string;
}

export const QuestionPaperSchema = SchemaFactory.createForClass(QuestionPaper);

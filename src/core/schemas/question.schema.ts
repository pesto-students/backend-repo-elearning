import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Question extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'QuestionPaper', required: true })
  QuestionPaperID: Types.ObjectId;

  @Prop({ type: String, required: true })
  Prompt: string;

  @Prop({ type: String })
  AnswerText: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);

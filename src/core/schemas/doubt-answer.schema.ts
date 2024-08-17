import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class DoubtAnswer extends Document {

  @Prop({ type: Types.ObjectId, ref: 'DoubtQuestion', required: true })
  DoubtQuestionID: Types.ObjectId;

  @Prop({ type: String, required: true })
  AnswerText: string;
}

export const DoubtAnswerSchema = SchemaFactory.createForClass(DoubtAnswer);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class DoubtQuestion extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Doubt', required: true })
  DoubtID: Types.ObjectId;

  @Prop({ type: String, required: true })
  QuestionText: string;
}

export const DoubtQuestionSchema = SchemaFactory.createForClass(DoubtQuestion);

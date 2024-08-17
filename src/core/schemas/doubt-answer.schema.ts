import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class DoubtAnswer extends Document {

  @Prop({ type: Types.ObjectId, ref: 'Branch', required: true })
  branchId: Types.ObjectId;
  
  @Prop({ type: Types.ObjectId, ref: 'DoubtQuestion', required: true })
  doubtQuestionId: Types.ObjectId;

  @Prop({ type: String, required: true })
  answerText: string;
}

export const DoubtAnswerSchema = SchemaFactory.createForClass(DoubtAnswer);

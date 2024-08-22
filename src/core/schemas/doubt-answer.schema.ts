import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BaseSchema, BaseSchemaOptions } from './base.schema';

@BaseSchemaOptions()
export class DoubtAnswer extends BaseSchema {

  @Prop({ type: Types.ObjectId, ref: 'Branch', required: true })
  branchId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'DoubtQuestion', required: true })
  doubtQuestionId: Types.ObjectId;

  @Prop({ type: String, required: true })
  answerText: string;
}

export const DoubtAnswerSchema = SchemaFactory.createForClass(DoubtAnswer);

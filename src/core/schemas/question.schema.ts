import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BaseSchema, BaseSchemaOptions } from './base.schema';

@BaseSchemaOptions()
export class Question extends BaseSchema { 

  @Prop({ type: Types.ObjectId, ref: 'Branch', required: true })
  branchId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'QuestionPaper', required: true })
  questionPaperId: Types.ObjectId;

  @Prop({ type: String, required: true })
  prompt: string;

  @Prop({ type: String })
  answerText: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);

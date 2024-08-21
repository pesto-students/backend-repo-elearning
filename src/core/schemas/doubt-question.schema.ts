import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BaseSchema, BaseSchemaOptions } from './base.schema';

@BaseSchemaOptions()
export class DoubtQuestion extends BaseSchema { 

  @Prop({ type: Types.ObjectId, ref: 'Doubt', required: true })
  doubtId: Types.ObjectId;

  @Prop({ type: String, required: true })
  questionText: string;
}

export const DoubtQuestionSchema = SchemaFactory.createForClass(DoubtQuestion);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BaseSchema, BaseSchemaOptions } from './base.schema';

@BaseSchemaOptions()
export class Plan extends BaseSchema {

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  description: string;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);

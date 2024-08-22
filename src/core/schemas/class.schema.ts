import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseSchema, BaseSchemaOptions } from './base.schema';

@BaseSchemaOptions()
export class Class extends BaseSchema {
  @Prop({ type: Types.ObjectId, ref: 'Branch', required: true })
  branchId: Types.ObjectId;

  @Prop({ type: String, required: true })
  className: string;

  @Prop({ type: String })
  schedule: string;
}

export const ClassSchema = SchemaFactory.createForClass(Class);

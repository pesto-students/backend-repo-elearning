import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { BaseSchema, BaseSchemaOptions } from './base.schema';
import { Branch } from './branch.schema';

@BaseSchemaOptions()
export class Class extends BaseSchema {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true })
  branchId: Branch;

  @Prop({ type: String, required: true,  formControl: { name: 'input', label: "Class Name", required: true } })
  className: string;

  @Prop({ type: String })
  schedule: string;
}

export const ClassSchema = SchemaFactory.createForClass(Class);

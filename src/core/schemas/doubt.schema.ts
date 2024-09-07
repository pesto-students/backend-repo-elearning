import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseSchema, BaseSchemaOptions } from './base.schema';

@BaseSchemaOptions()
export class Doubt extends BaseSchema {

  @Prop({ type: Types.ObjectId, ref: 'Branch', required: true })
  branchId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
  studentId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'OnlineClass', required: true })
  onlineClassId: Types.ObjectId;
}

export const DoubtSchema = SchemaFactory.createForClass(Doubt);

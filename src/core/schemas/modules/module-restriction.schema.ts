import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BaseSchema, BaseSchemaOptions } from '../base.schema';

@BaseSchemaOptions()
export class ModuleRestriction extends BaseSchema {

  @Prop({ type: Types.ObjectId, ref: 'Plan', required: true })
  planId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Module', required: true })
  moduleId: Types.ObjectId;

  @Prop({ type: String, required: true })
  restrictionDescription: string;
}

export const ModuleRestrictionSchema = SchemaFactory.createForClass(ModuleRestriction);

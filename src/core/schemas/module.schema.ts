import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BaseSchema, BaseSchemaOptions } from './base.schema';

@BaseSchemaOptions()
export class Module extends BaseSchema {
  
  @Prop({ type: String, required: true })
  moduleName: string;

  @Prop({ type: String })
  description: string;
}

export const ModuleSchema = SchemaFactory.createForClass(Module);

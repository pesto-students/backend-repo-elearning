import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema, BaseSchemaOptions } from './base.schema';


@BaseSchemaOptions()

export class OrganizationType extends BaseSchema {
  @Prop({ type: String, required: true })
  name: string;
}


export const OrganizationTypeSchema = SchemaFactory.createForClass(OrganizationType);

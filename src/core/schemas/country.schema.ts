import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema, BaseSchemaOptions } from './base.schema';

@BaseSchemaOptions()
export class Country extends BaseSchema {

  @Prop({ type: String, required: true, formControl: { name: 'input', label: 'Country Name', required: true } })
  name: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);

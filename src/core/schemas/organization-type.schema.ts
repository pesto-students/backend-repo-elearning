import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class OrganizationType extends Document {

  @Prop({ type: String, required: true })
  name: string;
}

export const OrganizationTypeSchema = SchemaFactory.createForClass(OrganizationType);

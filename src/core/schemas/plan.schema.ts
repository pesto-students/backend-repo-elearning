import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Plan extends Document {

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  description: string;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);

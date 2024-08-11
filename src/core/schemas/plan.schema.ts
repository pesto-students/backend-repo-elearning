import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Plan extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  _id: Types.ObjectId;

  @Prop({ type: String, required: true })
  PlanName: string;

  @Prop({ type: String })
  Description: string;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);

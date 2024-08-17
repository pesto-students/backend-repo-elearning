import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Subscription extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Organization', required: true })
  OrganizationID: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Module', required: true })
  ModuleID: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Plan', required: true })
  PlanID: Types.ObjectId;

  @Prop({ type: Date, required: true })
  SubscriptionDate: Date;

  @Prop({ type: Date, required: true })
  ExpiryDate: Date;

  @Prop({ type: String, required: true })
  Status: string;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);

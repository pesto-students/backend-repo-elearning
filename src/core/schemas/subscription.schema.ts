import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Subscription extends Document { 

  @Prop({ type: Types.ObjectId, ref: 'Organization', required: true })
  organizationId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Branch', required: true })
  branchId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Module', required: true })
  moduleId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Plan', required: true })
  planId: Types.ObjectId;

  @Prop({ type: Date, required: true })
  subscriptionDate: Date;

  @Prop({ type: Date, required: true })
  expiryDate: Date;

  @Prop({ type: String, required: true })
  status: string;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);

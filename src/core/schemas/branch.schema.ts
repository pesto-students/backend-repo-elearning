import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Branch extends Document {
   
  @Prop({ type: Types.ObjectId, ref: 'Organization', required: true })
  organizationId: Types.ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: Types.ObjectId, ref: 'Country', required: true })
  countryId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'State', required: true })
  stateId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'City', required: true })
  cityId: Types.ObjectId;

  @Prop({ type: String, required: true })
  pincode: string;

  @Prop({ type: String, required: true })
  contactEmail: string;

  @Prop({ type: String, required: true })
  contactPhone: string;
}

export const BranchSchema = SchemaFactory.createForClass(Branch);

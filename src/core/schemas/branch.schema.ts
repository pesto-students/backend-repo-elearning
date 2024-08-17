import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Branch extends Document {
  @Prop({ type: Number, required: true })
  _id: number;

  @Prop({ type: Types.ObjectId, ref: 'Organization', required: true })
  OrganizationID: Types.ObjectId;

  @Prop({ type: String, required: true })
  Name: string;

  @Prop({ type: String, required: true })
  Address: string;

  @Prop({ type: Types.ObjectId, ref: 'Country', required: true })
  CountryID: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'State', required: true })
  StateID: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'City', required: true })
  CityID: Types.ObjectId;

  @Prop({ type: String, required: true })
  Pincode: string;

  @Prop({ type: String, required: true })
  ContactEmail: string;

  @Prop({ type: String, required: true })
  ContactPhone: string;
}

export const BranchSchema = SchemaFactory.createForClass(Branch);

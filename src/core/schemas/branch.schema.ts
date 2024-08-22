import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { BaseSchema, BaseSchemaOptions } from './base.schema';
import { Organization } from './organization.schema';
import { Country } from './country.schema';
import { State } from './state.schema';
import { City } from './city.schema';

@BaseSchemaOptions()
export class Branch extends BaseSchema {
   
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true })
  organizationId: Organization;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true })
  countryId: Country;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true })
  stateId: State;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true })
  cityId: City;

  @Prop({ type: String, required: true })
  pincode: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  phone: string;
}

export const BranchSchema = SchemaFactory.createForClass(Branch);

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

  @Prop({ type: String, required: true, formControl: { name: 'input', label: 'Branch Name', required: true } })
  name: string;

  @Prop({ type: String, required: true, formControl: { name: 'input', label: 'Address', required: true } })
  address: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: true,
    formControl: { name: 'select', label: 'Country', required: true }
  })
  countryId: Country;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'State',
    required: true,
    formControl: { name: 'select', label: 'State', required: true }
  })
  stateId: State;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true,
    formControl: { name: 'select', label: 'City', required: true }
  })
  cityId: City;

  @Prop({ type: String, required: true, formControl: { name: 'input', label: 'Pincode', required: true } })
  pincode: string;

  @Prop({ type: String, required: true, formControl: { name: 'input', label: 'Email', required: true } })
  email: string;

  @Prop({ type: String, required: true, formControl: { name: 'input', label: 'Phone', required: true } })
  phone: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const BranchSchema = SchemaFactory.createForClass(Branch);

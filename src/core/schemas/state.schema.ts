import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { BaseSchema, BaseSchemaOptions } from './base.schema';
import { LocationRoutes } from 'src/location/location.routes';
import { Country } from './country.schema';

@BaseSchemaOptions()
export class State extends BaseSchema {
 
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true, formControl: { name: 'autosuggest', label: 'Country', apiDetails: { endpoint: LocationRoutes.FETCH_COUNTRY, onMount: true } } })
  countryId: Country; 

  @Prop({ type: String, required: true, formControl: { name: 'input', label: 'State Name', required: true } })
  name: string;
}

export const StateSchema = SchemaFactory.createForClass(State);

import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { BaseSchema, BaseSchemaOptions } from './base.schema';
import { LocationRoutes } from 'src/location/location.routes';
import { State } from './state.schema';

@BaseSchemaOptions()
export class City extends BaseSchema {
 
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true, formControl: { name: 'autosuggest', label: 'State', apiDetails: { endpoint: LocationRoutes.FETCH_STATE, onMount: true } } })
  stateId: State;
 
  @Prop({ type: String, required: true, formControl: { name: 'input', label: 'City Name', required: true } })
  name: string;
}

export const CitySchema = SchemaFactory.createForClass(City);

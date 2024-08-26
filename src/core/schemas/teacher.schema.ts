import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { BaseSchema, BaseSchemaOptions } from './base.schema';
import { Branch } from "./branch.schema";
import { Country } from "./country.schema";
import { State } from "./state.schema";
import { City } from "./city.schema";

@BaseSchemaOptions()
export class Teacher extends BaseSchema {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true })
    branchId: mongoose.Types.ObjectId;
  
    @Prop({ type: String, required: true, formControl: { name: 'input', type: 'text', label: 'First Name' } })
    firstName: string;
  
    @Prop({ type: String, formControl: { name: 'input', type: 'text', label: 'Last Name' } })
    lastName?: string;
  
    @Prop({ type: String, required: true, formControl: { name: 'input', type: 'email', label: 'Email' } })
    email: string;
  
    @Prop({ type: String, required: true, formControl: { name: 'input', type: 'tel', label: 'Phone' } })
    phone: string;
  
    @Prop({ type: String, required: true, formControl: { name: 'input', type: 'text', label: 'Address' } })
    address: string;
  
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true, formControl: { name: 'select', label: 'Country', options: [] } })
    countryId: Country;
  
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true, formControl: { name: 'select', label: 'State', options: [] } })
    stateId: State;
  
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true, formControl: { name: 'select', label: 'City', options: [] } })
    cityId: City;
  
    @Prop({ type: String, required: true, formControl: { name: 'input', type: 'text', label: 'Pincode' } })
    pincode: string;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher)
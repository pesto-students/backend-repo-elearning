import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { BaseSchema, BaseSchemaOptions } from './base.schema';
import { Branch } from "./branch.schema";
import { Country } from "./country.schema";
import { State } from "./state.schema";
import { City } from "./city.schema";
import { LocationRoutes } from "src/location/location.routes";
import { Class } from "./class.schema";

@BaseSchemaOptions()
export class Teacher extends BaseSchema {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true })
    branchId: mongoose.Types.ObjectId;

    @Prop({ type: String, required: true, formControl: { name: 'input', type: 'text', label: 'First Name' } })
    firstName: string;

    @Prop({ type: String, formControl: { name: 'input', type: 'text', label: 'Last Name' } })
    lastName?: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true, formControl: { name: 'autosuggest', label: 'Class', apiDetails: { endpoint: '/api/class/fetch', method: 'POST', body: {}, resultKey: 'className', onMount: true } } })
    classId: Class;

    @Prop({ type: String, required: true, formControl: { name: 'input', type: 'email', label: 'Email' } })
    email: string;

    @Prop({ type: String, required: true, formControl: { name: 'input', type: 'tel', label: 'Phone' } })
    phone: string;

    @Prop({ type: String, required: true, formControl: { name: 'input', type: 'text', label: 'Address' } })
    address: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true, formControl: { name: 'autosuggest', label: 'Country', apiDetails: { endpoint: LocationRoutes.FETCH_COUNTRY, onMount: true } } })
    countryId: Country;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true, formControl: { name: 'autosuggest', label: 'State', apiDetails: { endpoint: LocationRoutes.FETCH_STATE, onMount: true } } })
    stateId: State;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true, formControl: { name: 'autosuggest', label: 'City', apiDetails: { endpoint: LocationRoutes.FETCH_CITY, method: 'POST', body: { keyword: '' } } } })
    cityId: City;

    @Prop({ type: String, required: true, formControl: { name: 'input', type: 'text', label: 'Pincode' } })
    pincode: string;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher)
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BaseSchema, BaseSchemaOptions } from './base.schema';
import { Branch } from './branch.schema';
import { City } from './city.schema';
import { Country } from './country.schema';
import { State } from './state.schema';
import { LocationRoutes } from 'src/location/location.routes';
import { Class } from './class.schema';

@BaseSchemaOptions()
export class Student extends BaseSchema {

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true,
    })
    branchId: Branch;

    @Prop({
        type: String,
        required: true,
        formControl: { name: 'input', label: 'First Name', required: true }
    })
    firstName: string;

    @Prop({
        type: String,
        required: true,
        formControl: { name: 'input', label: 'Last Name', required: true }
    })
    lastName: string;

    @Prop({
        type: Date,
        required: true,
        formControl: { name: 'datePicker', label: 'Date of Birth', required: true }
    })
    dateOfBirth: Date;

    @Prop({
        type: String,
        required: true,
        formControl: { name: 'select', label: 'Gender', required: true, options: ['Male', 'Female', 'Other'] }
    })
    gender: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Class', formControl: { name: 'autosuggest', label: 'Class', apiDetails: { endpoint: '/api/class/fetch', method: 'POST', body: {}, resultKey: 'className', onMount: true } } })
    classId: Class;

    @Prop({
        type: Date,
        required: false,
        formControl: { name: 'date', label: 'Enrollment Date', required: true }
    })
    enrollmentDate: Date;

    @Prop({
        type: String,
        required: true,
        formControl: { name: 'input', label: 'Email', required: true }
    })
    email: string;

    @Prop({
        type: String,
        formControl: { name: 'input', label: 'Phone' }
    })
    phone: string;

    @Prop({
        type: String,
        required: true,
        formControl: { name: 'textarea', label: 'Address', required: true }
    })
    address: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true, formControl: { name: 'autosuggest', label: 'Country', apiDetails: { endpoint: LocationRoutes.FETCH_COUNTRY, onMount: true } } })
    countryId: Country;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true, formControl: { name: 'autosuggest', label: 'State', apiDetails: { endpoint: LocationRoutes.FETCH_STATE, onMount: true } } })
    stateId: State;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true, formControl: { name: 'autosuggest', label: 'City', apiDetails: { endpoint: LocationRoutes.FETCH_CITY, method: 'POST', body: { keyword: '' } } } })
    cityId: City;

    @Prop({
        type: String,
        required: true,
        formControl: { name: 'input', label: 'Pincode', required: true }
    })
    pincode: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);

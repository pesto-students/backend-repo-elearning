import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BaseSchema, BaseSchemaOptions } from './base.schema';
import { Branch } from './branch.schema';
import { City } from './city.schema';
import { Country } from './country.schema';
import { State } from './state.schema';

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
        formControl: { name: 'date', label: 'Date of Birth', required: true }
    })
    dateOfBirth: Date;

    @Prop({ 
        type: String, 
        required: true,
        formControl: { name: 'select', label: 'Gender', required: true, options: ['Male', 'Female', 'Other'] }
    })
    gender: string;

    @Prop({ 
        type: Date, 
        required: true,
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

    @Prop({ 
        type: String, 
        required: true,
        formControl: { name: 'input', label: 'Pincode', required: true }
    })
    pincode: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);

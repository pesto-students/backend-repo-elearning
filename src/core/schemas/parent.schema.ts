import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { LocationRoutes } from 'src/location/location.routes';
import { StudentRoutes } from 'src/students/student.routes';

@Schema()
export class Parent extends Document {
    @ApiProperty({ type: String, description: 'Student ID' })
    @Prop({
        type: Types.ObjectId,
        ref: 'Student',
        required: true,
        formControl: {
            name: 'autosuggest',
            label: 'Student Full Name',
            apiDetails: {
                endpoint: StudentRoutes.SEARCH_STUDENT,
                method: 'POST',
                body: { keyword: '' },
                resultKey: 'fullName'
            },
        }
    })
    studentId: Types.ObjectId;

    @ApiProperty({ type: String, description: 'Father Name' })
    @Prop({
        type: String,
        required: true,
        formControl: {
            name: 'input',
            label: 'Father Name',
            required: true
        }
    })
    fatherName: string;

    @ApiProperty({ type: String, description: 'Mother Name' })
    @Prop({
        type: String,
        required: true,
        formControl: {
            name: 'input',
            label: 'Mother Name',
            required: true
        }
    })
    motherName: string;

    @ApiProperty({ type: String, description: 'Email' })
    @Prop({
        type: String,
        required: true,
        formControl: {
            name: 'input',
            label: 'Email',
            required: true
        }
    })
    email: string;

    @ApiProperty({ type: String, description: 'Phone' })
    @Prop({
        type: String,
        formControl: {
            name: 'input',
            label: 'Phone'
        }
    })
    phone: string;

    @ApiProperty({ type: String, description: 'Address' })
    @Prop({
        type: String,
        required: true,
        formControl: {
            name: 'textarea',
            label: 'Address',
            required: true
        }
    })
    address: string;

    @ApiProperty({ type: String, description: 'Country ID' })
    @Prop({
        type: Types.ObjectId,
        ref: 'Country',
        required: true,
        formControl: {
            name: 'autosuggest',
            label: 'Country',
            apiDetails: {
                endpoint: LocationRoutes.FETCH_COUNTRY,
                onMount: true
            }
        }
    })
    countryId: Types.ObjectId;

    @ApiProperty({ type: String, description: 'State ID' })
    @Prop({
        type: Types.ObjectId,
        ref: 'State',
        required: true,
        formControl: {
            name: 'autosuggest',
            label: 'State',
            apiDetails: {
                endpoint: LocationRoutes.FETCH_STATE,
                onMount: true
            }
        }
    })
    stateId: Types.ObjectId;

    @ApiProperty({ type: String, description: 'City ID' })
    @Prop({
        type: Types.ObjectId,
        ref: 'City',
        required: true,
        formControl: {
            name: 'autosuggest',
            label: 'City',
            apiDetails: {
                endpoint: LocationRoutes.FETCH_CITY,
                method: 'POST',
                body: { keyword: '' }
            }
        }
    })
    cityId: Types.ObjectId;

    @ApiProperty({ type: String, description: 'Pincode' })
    @Prop({
        type: String,
        required: true,
        formControl: {
            name: 'input',
            label: 'Pincode',
            required: true
        }
    })
    pincode: string;
}

export const ParentSchema = SchemaFactory.createForClass(Parent);
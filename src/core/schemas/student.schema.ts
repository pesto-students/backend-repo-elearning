import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BaseSchema, BaseSchemaOptions } from './base.schema';

@BaseSchemaOptions()
export class Student extends BaseSchema { 

    @Prop({ type: Types.ObjectId, ref: 'Branch', required: true })
    branchId: Types.ObjectId;

    @Prop({ type: String, required: true })
    firstName: string;

    @Prop({ type: String, required: true })
    lastName: string;

    @Prop({ type: Date, required: true })
    dateOfBirth: Date;

    @Prop({ type: String, required: true })
    gender: string;

    @Prop({ type: Date, required: true })
    enrollmentDate: Date;

    @Prop({ type: String, required: true })
    email: string;

    @Prop({ type: String, required: true })
    phone: string;

    @Prop({ type: String, required: true })
    address: string;

    @Prop({ type: Types.ObjectId, ref: 'Country', required: true })
    countryId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'State', required: true })
    stateId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'City', required: true })
    cityId: Types.ObjectId;

    @Prop({ type: String, required: true })
    pincode: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);

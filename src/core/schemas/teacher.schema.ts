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
    branchId: Branch;

    @Prop({ type: String, required: true })
    firstName: string;

    @Prop({ type: String })
    lastName: string;

    @Prop({ type: String, required: true })
    email: string;

    @Prop({ type: String, required: true })
    phone: string;

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
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher)
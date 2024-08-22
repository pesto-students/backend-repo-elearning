import { Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { BaseSchema, BaseSchemaOptions } from './base.schema';
import { Country } from "./country.schema";
import { State } from "./state.schema";
import { City } from "./city.schema";
import { OrganizationType } from "./organization-type.schema";

@BaseSchemaOptions()
export class Organization extends BaseSchema {

    @Prop({ type: String, required: true, unique: true, })
    organizationId: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'OrganizationType', required: true })
    organizationTypeId: OrganizationType;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true })
    countryId: Country;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true })
    stateId: State;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true })
    cityId: City;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    address: string;

    @Prop({ type: String, required: true })
    pincode: string;

    @Prop({ type: String, required: true })
    email: string;

    @Prop({ type: String, required: true })
    phone: string;

    @Prop({ type: String, required: true, default: false })
    emailVerified: boolean;

}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
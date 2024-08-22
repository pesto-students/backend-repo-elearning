import { Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { BaseSchema, BaseSchemaOptions } from './base.schema';
import { Country } from "./country.schema";
import { State } from "./state.schema";
import { City } from "./city.schema";
import { OrganizationType } from "./organization-type.schema";

@BaseSchemaOptions()
export class Organization extends BaseSchema {

    @Prop({ type: String, required: true, formControl: { name: 'input', label: "Organization Name" } })
    name: string;

    @Prop({ type: String, required: true, unique: true, formControl: { name: 'input', label: "Organization Registration Number" } })
    organizationId: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: 'OrganizationType', required: true, formControl: {
            name: 'select', label: "Organization Type",
            data: ['School', 'College', 'Coaching', 'Individual']
        }
    })
    organizationTypeId: OrganizationType;

    @Prop({ type: String, required: true, formControl: { name: 'input', type: 'email', label: "Organization Email ID" } })
    email: string;

    @Prop({ type: String, required: true, formControl: { name: 'input', type: 'password', label: "Password" } })
    password: string;

    @Prop({ type: String, required: true, formControl: { name: "input", label: "Organization Contact Number", maxLength: 10 } })
    phone: string;

    @Prop({ type: String, required: true, formControl: { name: "textarea", label: "Organization Address" } })
    address: string;

    @Prop({ type: String, required: true, formControl: { name: "input", maxLength: 6, label: "Pincode" } })
    pincode: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true, formControl: { name: "select", label: "City" } })
    cityId: City;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true, formControl: { name: "select", label: "State", data: ['Delhi', 'Maharashtra', 'Karnataka'] } })
    stateId: State;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true, formControl: { name: "select", label: "Country", data: ['India'] } })
    countryId: Country;

    @Prop({ type: String, required: true, default: false })
    emailVerified: boolean;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
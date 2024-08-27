import { Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { BaseSchema, BaseSchemaOptions } from './base.schema';
import { Country } from "./country.schema";
import { State } from "./state.schema";
import { City } from "./city.schema";
import { OrganizationType } from "./organization-type.schema";
import { LocationRoutes } from "src/location/location.routes";

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

    @Prop({ type: String, formControl: { name: 'input', type: 'password', label: "Password", required: true } })
    password: string;

    @Prop({ type: String, required: true, formControl: { name: "input", label: "Organization Contact Number", maxLength: 10 } })
    phone: string;

    @Prop({ type: String, required: true, formControl: { name: "textarea", label: "Organization Address" } })
    address: string;

    @Prop({ type: String, required: true, formControl: { name: "input", maxLength: 6, label: "Pincode" } })
    pincode: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true, formControl: { name: 'autosuggest', label: 'Country', apiDetails: { endpoint: LocationRoutes.FETCH_COUNTRY, onMount: true } } })
    countryId: Country;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true, formControl: { name: 'autosuggest', label: 'State', apiDetails: { endpoint: LocationRoutes.FETCH_STATE, onMount: true } } })
    stateId: State;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true, formControl: { name: 'autosuggest', label: 'City', apiDetails: { endpoint: LocationRoutes.FETCH_CITY, method: 'POST', body: { keyword: '' } } } })
    cityId: City;

    @Prop({ type: String, required: true, default: false })
    emailVerified: boolean;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { BaseSchema, BaseSchemaOptions } from './base.schema';

@BaseSchemaOptions()
export class Organization extends BaseSchema {

    @Prop({ type: String, required: true, unique: true, })
    organizationId: string;

    @Prop({ type: Types.ObjectId, ref: 'OrganizationType', required: true })
    organizationTypeId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Country', required: true })
    countryId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'State', required: true })
    stateId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'City', required: true })
    cityId: Types.ObjectId;

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
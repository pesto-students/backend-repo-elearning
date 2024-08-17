import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";

@Schema({ timestamps: true })
export class Organization extends Document {

    @Prop({ type: String, required: true })
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

}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";

@Schema({ timestamps: true })
export class Organization extends Document {

    @Prop({ type: String, required: true })
    OrganizationID: string;

    // @Prop({ type: Types.ObjectId, ref: 'OrganizationType', required: true })
    // OrganizationTypeID: Types.ObjectId;

    // @Prop({ type: Types.ObjectId, ref: 'Country', required: true })
    // CountryID: Types.ObjectId;

    // @Prop({ type: Types.ObjectId, ref: 'State', required: true })
    // StateID: Types.ObjectId;

    // @Prop({ type: Types.ObjectId, ref: 'City', required: true })
    // CityID: Types.ObjectId;

    // @Prop({ type: String, required: true })
    // Name: string;

    // @Prop({ type: String, required: true })
    // Address: string;

    // @Prop({ type: String, required: true })
    // Pincode: string;

    // @Prop({ type: String, required: true })
    // ContactEmail: string;

    // @Prop({ type: String, required: true })      
    // ContactPhone: string;

}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";

@Schema({ timestamps: true })
export class Organization extends Document {

    @Prop({ type: String, required: true, formControl: { name: 'input', label: "Organization Name" } })
    Name: string;

    @Prop({ type: String, required: true, formControl: { name: 'input', label: "Organization Registration Number" } })
    7: string;

    @Prop({
        type: Types.ObjectId, ref: 'OrganizationType', required: true, formControl: {
            name: 'select', label: "Organization Type",
            data: ['School', 'College', 'Coaching', 'Individual']
        }
    })
    OrganizationTypeID: Types.ObjectId;

    @Prop({ type: String, required: true, formControl: { name: 'input', type: 'email', label: "Organization Email ID" } })
    ContactEmail: string;

    @Prop({ type: String, required: true, formControl: { name: 'input', type: 'password', label: "Password" } })
    Password: string;

    @Prop({ type: String, required: true, formControl: { name: "input", label: "Organization Contact Number", maxLength: 10 } })
    ContactPhone: string;

    @Prop({ type: String, required: true, formControl: { name: "textarea", label: "Organization Address" } })
    Address: string;

    @Prop({ type: String, required: true, formControl: { name: "input", maxLength: 6, label: "Pincode" } })
    Pincode: string;

    @Prop({ type: Types.ObjectId, ref: 'City', required: true, formControl: { name: "select", label: "City" } })
    CityID: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'State', required: true, formControl: { name: "select", label: "State", data: ['Delhi', 'Maharashtra', 'Karnataka'] } })
    StateID: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Country', required: true, formControl: { name: "select", label: "Country", data: ['India'] } })
    CountryID: Types.ObjectId;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
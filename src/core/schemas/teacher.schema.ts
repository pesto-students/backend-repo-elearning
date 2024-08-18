import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";

@Schema({ timestamps: true })

export class Teacher extends Document {
    @Prop({ type: Types.ObjectId, required: true })
    _id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Branch', required: true })
    BranchID: Types.ObjectId;

    @Prop({ type: String, required: true })
    FirstName: string;

    @Prop({ type: String })
    LastName: string;

    @Prop({ type: String, required: true })
    Email: string;

    @Prop({ type: String, required: true })
    Phone: string;

    @Prop({ type: String, required: true })
    Address: string;

    @Prop({ type: Types.ObjectId, ref: 'Country', required: true })
    CountryID: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'State', required: true })
    StateID: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'City', required: true })
    CityID: Types.ObjectId;

    @Prop({ type: String, required: true })
    Pincode: string;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher)
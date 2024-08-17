import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({timestamps: true})

export class Teacher extends Document { 

    @Prop({type: Types.ObjectId, ref: 'Branch', required: true})
    branchId: Types.ObjectId;

    @Prop({type: String, required: true})
    firstName: string;

    @Prop({ type: String })
    lastName: string;

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

export const TeacherSchema = SchemaFactory.createForClass(Teacher)
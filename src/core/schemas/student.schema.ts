import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Student extends Document {
    @Prop({ type: Number, required: true })
    _id: number;

    @Prop({ type: Types.ObjectId, ref: 'Branch', required: true })
    BranchID: Types.ObjectId;

    @Prop({ type: String, required: true })
    FirstName: string;

    @Prop({ type: String, required: true })
    LastName: string;

    @Prop({ type: Date, required: true })
    DateOfBirth: Date;

    @Prop({ type: String, required: true })
    Gender: string;

    @Prop({ type: Date, required: true })
    EnrollmentDate: Date;

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

export const StudentSchema = SchemaFactory.createForClass(Student);

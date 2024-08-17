import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({timestamps: true})

export class Subject extends Document{
    @Prop({type: Types.ObjectId, required: true})
    _id: Types.ObjectId;

    @Prop({type: String, required: true})
    SubjectName: string;

    @Prop({type: Boolean, required: true, default: true})
    IsActive: Boolean;
}

export const SubjectSchema =  SchemaFactory.createForClass(Subject);
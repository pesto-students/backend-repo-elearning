import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({timestamps: true})

export class Subject extends Document{ 

    @Prop({ type: Types.ObjectId, ref: 'Branch', required: true })
    branchId: Types.ObjectId;

    @Prop({type: String, required: true})
    subjectName: string;

    @Prop({type: Boolean, required: true, default: true})
    isActive: Boolean;
}

export const SubjectSchema =  SchemaFactory.createForClass(Subject);
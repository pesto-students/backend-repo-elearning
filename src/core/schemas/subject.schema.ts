import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { BaseSchema, BaseSchemaOptions } from './base.schema';

@BaseSchemaOptions()
export class Subject extends BaseSchema{ 

    @Prop({ type: Types.ObjectId, ref: 'Branch', required: true })
    branchId: Types.ObjectId;

    @Prop({type: String, required: true})
    subjectName: string;

    @Prop({type: Boolean, required: true, default: true})
    isActive: Boolean;
}

export const SubjectSchema =  SchemaFactory.createForClass(Subject);
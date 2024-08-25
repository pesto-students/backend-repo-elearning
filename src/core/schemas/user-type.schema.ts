import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema, BaseSchemaOptions } from "./base.schema";
import mongoose from "mongoose";
import { Branch } from "./branch.schema";

@BaseSchemaOptions()
export class UserType extends BaseSchema{
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true })
    branchId: Branch;

    @Prop({ type: String, required: true })
    userType: string;
}

export const userTypeSchema = SchemaFactory.createForClass(UserType);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { BaseSchema, BaseSchemaOptions } from './base.schema';
import { Branch } from './branch.schema';
import { Class } from './class.schema';
import { Auth } from './auth.schema';

@BaseSchemaOptions()
export class OnlineClass extends BaseSchema {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true })
  branchId: Branch;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true })
  classId: Class;

  @Prop({ type: String, required: true,  formControl: { name: 'input', label: "Title", required: true } })
  title: string;

  @Prop({ type: String,  formControl: { name: 'input', label: "Description" } })
  description: string;

  @Prop({ type: Date, required: true,  formControl: { name: 'input', label: "Schedule Date", required: true } })
  scheduledDate: Date;

  @Prop({ type: String, required: true, formControl: { name: 'input', label: "Start Time", required: true } })
  startTime: string;

  @Prop({ type: String, required: true,  formControl: { name: 'input', label: "End Time", required: true } })
  endTime: string;

  @Prop({ type: String, required: true })
  meetingLink: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'auth'})
  createdBy: Auth;
}

export const OnlineClassSchema = SchemaFactory.createForClass(OnlineClass);

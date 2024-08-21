import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BaseSchema, BaseSchemaOptions } from './base.schema';

@BaseSchemaOptions()
export class OnlineClassAttendance extends BaseSchema { 

  @Prop({ type: Types.ObjectId, ref: 'Branch', required: true })
  branchId: Types.ObjectId;
  
  @Prop({ type: Types.ObjectId, ref: 'OnlineClass', required: true })
  onlineClassId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
  studentId: Types.ObjectId;

  @Prop({ type: String, required: true })
  attendanceStatus: string;

  @Prop({ type: Date })
  joinTime: Date;

  @Prop({ type: Date })
  leaveTime: Date;
}

export const OnlineClassAttendanceSchema = SchemaFactory.createForClass(OnlineClassAttendance);

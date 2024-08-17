import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class OnlineClassAttendance extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'OnlineClass', required: true })
  OnlineClassID: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
  StudentID: Types.ObjectId;

  @Prop({ type: String, required: true })
  AttendanceStatus: string;

  @Prop({ type: Date })
  JoinTime: Date;

  @Prop({ type: Date })
  LeaveTime: Date;
}

export const OnlineClassAttendanceSchema = SchemaFactory.createForClass(OnlineClassAttendance);

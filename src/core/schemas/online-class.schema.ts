import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class OnlineClass extends Document {
  @Prop({ type: Number, required: true })
  _id: number;

  @Prop({ type: Types.ObjectId, ref: 'Class', required: true })
  ClassID: Types.ObjectId;

  @Prop({ type: String, required: true })
  Title: string;

  @Prop({ type: String })
  Description: string;

  @Prop({ type: Date, required: true })
  ScheduledDate: Date;

  @Prop({ type: String, required: true })
  StartTime: string;

  @Prop({ type: String, required: true })
  EndTime: string;

  @Prop({ type: String, required: true })
  MeetingLink: string;
}

export const OnlineClassSchema = SchemaFactory.createForClass(OnlineClass);

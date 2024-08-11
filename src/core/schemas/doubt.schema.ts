import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Doubt extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
  StudentID: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'OnlineClass', required: true })
  OnlineClassID: Types.ObjectId;
}

export const DoubtSchema = SchemaFactory.createForClass(Doubt);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Class extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Branch', required: true })
  BranchID: Types.ObjectId;

  @Prop({ type: String, required: true })
  ClassName: string;

  @Prop({ type: String })
  Schedule: string;
}

export const ClassSchema = SchemaFactory.createForClass(Class);

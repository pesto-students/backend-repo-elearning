import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Class extends Document {
  
  @Prop({ type: Types.ObjectId, ref: 'Branch', required: true })
  branchId: Types.ObjectId;

  @Prop({ type: String, required: true })
  className: string;

  @Prop({ type: String })
  schedule: string;
}

export const ClassSchema = SchemaFactory.createForClass(Class);

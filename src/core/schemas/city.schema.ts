import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class City extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'State', required: true })
  StateID: Types.ObjectId;

  @Prop({ type: String, required: true })
  CityName: string;
}

export const CitySchema = SchemaFactory.createForClass(City);

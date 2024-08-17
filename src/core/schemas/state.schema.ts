import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class State extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Country', required: true })
  CountryID: Types.ObjectId;

  @Prop({ type: String, required: true })
  StateName: string;
}

export const StateSchema = SchemaFactory.createForClass(State);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Module extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  _id: Types.ObjectId;

  @Prop({ type: String, required: true })
  ModuleName: string;

  @Prop({ type: String })
  Description: string;
}

export const ModuleSchema = SchemaFactory.createForClass(Module);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Module extends Document {
  
  @Prop({ type: String, required: true })
  moduleName: string;

  @Prop({ type: String })
  description: string;
}

export const ModuleSchema = SchemaFactory.createForClass(Module);

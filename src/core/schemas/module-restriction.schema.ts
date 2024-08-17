import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class ModuleRestriction extends Document { 

  @Prop({ type: Types.ObjectId, ref: 'Plan', required: true })
  planId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Module', required: true })
  moduleId: Types.ObjectId;

  @Prop({ type: String, required: true })
  restrictionDescription: string;
}

export const ModuleRestrictionSchema = SchemaFactory.createForClass(ModuleRestriction);

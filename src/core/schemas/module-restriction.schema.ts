import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class ModuleRestriction extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Plan', required: true })
  PlanID: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Module', required: true })
  ModuleID: Types.ObjectId;

  @Prop({ type: String, required: true })
  RestrictionDescription: string;
}

export const ModuleRestrictionSchema = SchemaFactory.createForClass(ModuleRestriction);

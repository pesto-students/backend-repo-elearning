import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BaseSchema, BaseSchemaOptions } from './base.schema';

@BaseSchemaOptions()
export class Auth extends BaseSchema {

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String, required: true })
  passwordHash: string;

  @Prop({ type: Date })
  lastLogin: Date;

  @Prop({ type: Boolean, default: false, required: true })
  isVerified: Boolean; 

}

export const AuthSchema = SchemaFactory.createForClass(Auth);

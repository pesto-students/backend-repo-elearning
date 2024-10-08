import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { BaseSchema, BaseSchemaOptions } from './base.schema';
import { Branch } from './branch.schema';
import { Organization } from './organization.schema';

@BaseSchemaOptions()
export class Auth extends BaseSchema {

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Date })
  lastLogin: Date;

  @Prop({ type: Boolean, default: false, required: true })
  isVerified: Boolean;

  @Prop({ type: String, required: true })
  userType: string;  // 'Student', 'Teacher', 'Admin', etc.

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true })
  branchId: Branch;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true })
  organizationId: Organization;

  @Prop({ type: Boolean, default: false, required: true })
  isActive: Boolean;

  @Prop()
  verificationToken: string;

  @Prop()
  verificationTokenExpires: Date;

}

export const AuthSchema = SchemaFactory.createForClass(Auth);

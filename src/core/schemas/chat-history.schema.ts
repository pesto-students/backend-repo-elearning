import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { BaseSchema, BaseSchemaOptions } from './base.schema';
import { Branch } from './branch.schema';
import { Auth } from './auth.schema';

@BaseSchemaOptions()
export class ChatHistory extends BaseSchema {

  @Prop({ type: Types.ObjectId, ref: 'Branch', required: true })
  branchId: Branch;

  @Prop({ type: Types.ObjectId, ref: 'Auth', required: true })
  userAuthId: Auth;

  @Prop({ type: String })
  chatId: string;

  @Prop({type: String})
  title: string;

  @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
  data: Record<string, any>;
}

export const chatHistorySchema = SchemaFactory.createForClass(ChatHistory);

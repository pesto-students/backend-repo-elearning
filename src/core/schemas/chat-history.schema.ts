import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseSchema, BaseSchemaOptions } from './base.schema';

@BaseSchemaOptions()
export class ChatHistory extends BaseSchema {

  @Prop({ type: Types.ObjectId, ref: 'Branch', required: true })
  branchId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Auth', required: true })
  userAuthId: Types.ObjectId;

  @Prop({ type: String })
  chatId: string;

  @Prop({type: String})
  title: string;

  @Prop({ type: String })
  data: string;
}

export const chatHistorySchema = SchemaFactory.createForClass(ChatHistory);

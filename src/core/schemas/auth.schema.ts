import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Auth extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  UserID: Types.ObjectId;

  @Prop({ type: String, required: true })
  Username: string;

  @Prop({ type: String, required: true })
  PasswordHash: string;

  @Prop({ type: Date })
  LastLogin: Date;

  @Prop({ type: Boolean, default: false, required: true })
  isVerified: Boolean; 

}

export const AuthSchema = SchemaFactory.createForClass(Auth);

import { Schema as MongooseSchema, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class BaseSchema extends Document {
  createdAt: Date;
  updatedAt: Date;
}

const schemaOptions: SchemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,  // Remove __v field
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      return ret;
    },
  },
};

export const BaseSchemaOptions = () => MongooseSchema(schemaOptions);

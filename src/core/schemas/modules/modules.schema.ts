import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema, BaseSchemaOptions } from '../base.schema';
import { DbStatusEnum } from '../../enums/status.enum';

@BaseSchemaOptions()
export class Modules extends BaseSchema {
  @Prop({ type: String, required: true })
  moduleName: string;

  @Prop({ type: String })
  description: string;

  @Prop({type: String})
  image: string;

  @Prop({ type: String, default: DbStatusEnum.ACTIVE })
  status: string;
}

export const ModulesSchema = SchemaFactory.createForClass(Modules);

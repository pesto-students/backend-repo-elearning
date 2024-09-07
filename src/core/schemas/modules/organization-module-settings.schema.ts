import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseSchema, BaseSchemaOptions } from '../base.schema';
import { Modules } from './modules.schema';
import { Organization } from '../organization.schema';
import { Branch } from '../branch.schema';

@BaseSchemaOptions()
export class OrganizationModuleSettings extends BaseSchema {
  @Prop({ type: Types.ObjectId, ref: 'module', required: true })
  moduleId: Modules;

  @Prop({ type: Types.ObjectId, ref: 'organization', required: true })
  organizationId: Organization;

  @Prop({ type: Types.ObjectId, ref: 'branch', required: true })
  branchId: Branch;

  @Prop({type: Boolean})
  enabled: boolean;
}

export const organizationModuleSettingsSchema = SchemaFactory.createForClass(OrganizationModuleSettings);

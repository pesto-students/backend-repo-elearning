import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { OrganizationModuleSettings } from "src/core/schemas/modules/organization-module-settings.schema";

@Injectable()
export class ModuleManagementRepository {
    constructor(
        @InjectModel(OrganizationModuleSettings.name) private orgModuleSettingsModel: Model<OrganizationModuleSettings>
    ) { }

    async subscribeModule(subscriptionData) {
        const res = await this.orgModuleSettingsModel.updateOne(
            subscriptionData,
            { enabled: true },
            { upsert: true },
        ).exec();

        return res;
    }

    async unsubscribeModule(subscriptionData) {
        const res = await this.orgModuleSettingsModel.updateOne(
            subscriptionData,
            { enabled: false },
            { upsert: true },
        ).exec();

        return res;
    }

    async isModuleEnabled(organizationId: string, moduleId: string, branchId: string): Promise<boolean> {
        const organizationModule = await this.orgModuleSettingsModel
          .findOne({ organizationId, branchId, moduleId, enabled: true })
          .exec();
    
        return !!organizationModule;
      }
}
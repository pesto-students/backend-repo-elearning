import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Modules } from "src/core/schemas/modules/modules.schema";
import { OrganizationModuleSettings } from "src/core/schemas/modules/organization-module-settings.schema";

@Injectable()
export class ModuleManagementRepository {
    constructor(
        @InjectModel(OrganizationModuleSettings.name) private orgModuleSettingsModel: Model<OrganizationModuleSettings>,
        @InjectModel(Modules.name) private readonly modulesModel: Model<Modules>,
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

    async getModulesWithSubscription(organizationId: string, branchId: string): Promise<any[]> {
        // Fetch all modules from the database
        const allModules = await this.modulesModel.find().exec();

        // Fetch the organization’s subscribed modules for a specific branch
        const subscribedModules = await this.orgModuleSettingsModel
            .find({ organizationId, branchId, enabled: true })
            .exec();

        // Get the list of subscribed module IDs
        const subscribedModuleIds = subscribedModules.map((module) => module.moduleId.toString());

        // Combine the data: map all modules and add a 'isSubscribed' flag
        return allModules.map((module) => ({
            ...module.toObject(),
            isSubscribed: subscribedModuleIds.includes(module._id.toString()), // Check if the module is subscribed
        }));
    }
}
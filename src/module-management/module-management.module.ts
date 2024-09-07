import { Module } from "@nestjs/common";
import { ModuleManagementService } from "./module-management.service";
import { ModuleManagementRepository } from "./repository/module-management.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { OrganizationModuleSettings, organizationModuleSettingsSchema } from "src/core/schemas/modules/organization-module-settings.schema";
import { ModuleManagementController } from "./module-management.controller";
import { Modules, ModulesSchema } from "src/core/schemas/modules/modules.schema";

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name: OrganizationModuleSettings.name,
                schema: organizationModuleSettingsSchema
            },
            {
                name: Modules.name,
                schema: ModulesSchema
            }
        ]),
    ],
    providers:[ModuleManagementService, ModuleManagementRepository],
    exports:[ModuleManagementService],
    controllers:[ModuleManagementController]
})

export class ModuleManagementModule{

}
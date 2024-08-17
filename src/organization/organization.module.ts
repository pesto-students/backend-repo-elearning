import { Module } from "@nestjs/common";
import { OrganizationController } from "./organization.controller";
import { OrganizationService } from "./organization.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Organization, OrganizationSchema } from "src/core/schemas/organization.schema";
import { OrganizationRepository } from "./repository/organization.repository";
import { OrganizationType, OrganizationTypeSchema } from "src/core/schemas/organization-type.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Organization.name,
                schema: OrganizationSchema
            },
            {
                name: OrganizationType.name,
                schema: OrganizationTypeSchema
            }
        ]),
    ],
    controllers: [OrganizationController],
    providers: [OrganizationService, OrganizationRepository]
})

export class OrganizationModule { }
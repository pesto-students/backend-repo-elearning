import { Module } from "@nestjs/common";
import { OrganizationController } from "./organization.controller";
import { OrganizationService } from "./organization.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Organization, OrganizationSchema } from "src/core/schemas/organization.schema";
import { OrganizationRepository } from "./repository/organization.repository";
import { OrganizationSchemaController } from "./organization.schema.controller";
import { OrganizationSchemaService } from "./organization.schema.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Organization.name,
                schema: OrganizationSchema
            }
        ]),
    ],
    controllers: [OrganizationController,OrganizationSchemaController],
    providers: [OrganizationService, OrganizationRepository,OrganizationSchemaService]
})

export class OrganizationModule { }
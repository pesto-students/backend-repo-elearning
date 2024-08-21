import { Module } from "@nestjs/common";
import { OrganizationController } from "./organization.controller";
import { OrganizationService } from "./organization.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Organization, OrganizationSchema } from "src/core/schemas/organization.schema";
import { OrganizationRepository } from "./repository/organization.repository";
import { OrganizationType, OrganizationTypeSchema } from "src/core/schemas/organization-type.schema";
import { City, CitySchema } from "src/core/schemas/city.schema";
import { Country, CountrySchema } from "src/core/schemas/country.schema";
import { State, StateSchema } from "src/core/schemas/state.schema";

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
            },
            {
                name: State.name,
                schema: StateSchema
            },
            {
                name: Country.name,
                schema: CountrySchema
            },
            {
                name: City.name,
                schema: CitySchema
            },
        ]),
    ],
    controllers: [OrganizationController],
    providers: [OrganizationService, OrganizationRepository]
})

export class OrganizationModule { }
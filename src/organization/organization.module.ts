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
import { Branch, BranchSchema } from "src/core/schemas/branch.schema";
import { Auth, AuthSchema } from "src/core/schemas/auth.schema";
import { UserModule } from "src/users/user.module";
import { UserRepository } from "src/users/repository/user.repository";
import { UserType, userTypeSchema } from "src/core/schemas/user-type.schema";
import { AuthModule } from "src/auth/auth.module";
 
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
            {
                name: Branch.name,
                schema: BranchSchema
            },
            {
                name: Auth.name,
                schema: AuthSchema
            },{
                name: UserType.name,
                schema: userTypeSchema
            }
        ]),
        UserModule,
        AuthModule
    ],
    controllers: [OrganizationController],
    providers: [OrganizationService, OrganizationRepository, UserRepository]
})

export class OrganizationModule { }
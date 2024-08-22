import { Module } from '@nestjs/common';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';
import { BranchRepository } from './repository/branch-repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Branch, BranchSchema } from 'src/core/schemas/branch.schema';
import { City, CitySchema } from 'src/core/schemas/city.schema';
import { Country, CountrySchema } from 'src/core/schemas/country.schema';
import { State, StateSchema } from 'src/core/schemas/state.schema';
import { Organization, OrganizationSchema } from 'src/core/schemas/organization.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Branch.name,
        schema: BranchSchema
      },
      {
        name: City.name,
        schema: CitySchema
      },
      {
        name: Country.name,
        schema: CountrySchema
      },
      {
        name: State.name,
        schema: StateSchema
      },
      {
        name: Organization.name,
        schema: OrganizationSchema
      }
    ])
  ],
  controllers: [BranchController],
  providers: [BranchService, BranchRepository]
})
export class BranchModule {}

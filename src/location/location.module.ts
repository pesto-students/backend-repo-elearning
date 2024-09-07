import { Module } from "@nestjs/common";
import { LocationController } from "./location.controller";
import { LocationService } from "./location.service";
import { LocationRepository } from "./location.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { State, StateSchema } from "src/core/schemas/state.schema";
import { Country, CountrySchema } from "src/core/schemas/country.schema";
import { City, CitySchema } from "src/core/schemas/city.schema";

@Module({
    imports:[
        MongooseModule.forFeature([
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
    providers:[LocationService, LocationRepository],
    controllers:[LocationController],
    exports:[]
})

export class LocationModule{}
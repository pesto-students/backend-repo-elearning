import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Country } from "src/core/schemas/country.schema";
import { CountryDto } from "./dto/country.dto";
import { StateDto } from "./dto/state.dto";
import { State } from "src/core/schemas/state.schema";
import { City } from "src/core/schemas/city.schema";

@Injectable()
export class LocationRepository{
    constructor(
        @InjectModel(Country.name) private countryModel: Model<Country>,
        @InjectModel(State.name) private stateModel: Model<State>,
        @InjectModel(City.name) private cityModel: Model<City>
    ){}

    async createCountry(countryDto: CountryDto): Promise<Country> {
        const createCountry = await new this.countryModel(countryDto);
        return createCountry.save();
    }

    async createState(stateDto): Promise<State> {
        const createState = await new this.stateModel(stateDto);
        return createState.save();
    }

    async createCity(cityDto): Promise<City> {
        const createCity = await new this.cityModel(cityDto);
        return createCity.save();
    }
}
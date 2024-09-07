import { Injectable } from "@nestjs/common";
import { LocationRepository } from "./location.repository";
import { CountryDto } from "./dto/country.dto";
import { LocationActionDto, locationType } from "./dto/action/location-action.dto";
import { FetchStateDto, StateDto } from "./dto/state.dto";
import { locationData } from "./data/location.data";
import { State } from "src/core/schemas/state.schema";
import { Country } from "src/core/schemas/country.schema";
import { FetchCityDto } from "./dto/city.dto";
import { City } from "src/core/schemas/city.schema";

@Injectable()
export class LocationService {
    constructor(private readonly locationRepository: LocationRepository) { }

    async fetchState(condition: FetchStateDto): Promise<State[]>{
        return this.locationRepository.findState(condition);
    }

    async fetchCountry(countryId?): Promise<Country[]>{
        return this.locationRepository.findCountry(countryId?.countryId);
    }

    async fetchCity(condition: FetchCityDto): Promise<City[]>{
        return this.locationRepository.findCity(condition);
    }

    async searchCity(keyword: string, limit=10){
        return await this.locationRepository.searchCityNamesLike(keyword, limit);
    }

    async firstTimeDataLoad(){
        const myLocationData = locationData;
        const countryDto: CountryDto = new CountryDto({
            name: myLocationData.name
        });
        const countryUId = await this.locationRepository.createCountry(countryDto);
        const country_Id = countryUId._id;
        console.log(countryUId, country_Id);

        for (const state of myLocationData.states) {
            const stateDto = {
                name: state.name,
                countryId: country_Id.toString()
            };

            console.log("stateDto,", stateDto)

            const stateUId = await this.locationRepository.createState(stateDto);
            const state_id = stateUId._id;
            for (const city of state.cities) {
                const cityDto = {
                    stateId: state_id.toString(),
                    name: city.name
                }
                await this.locationRepository.createCity(cityDto);
            }

        }
    } 
}
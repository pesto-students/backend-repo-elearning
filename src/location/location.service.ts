import { Injectable } from "@nestjs/common";
import { LocationRepository } from "./location.repository";
import { CountryDto } from "./dto/country.dto";
import { LocationActionDto, locationType } from "./dto/action/location-action.dto";
import { StateDto } from "./dto/state.dto";
import { locationData } from "./data/location.data";
import { State } from "src/core/schemas/state.schema";

@Injectable()
export class LocationService {
    constructor(private readonly locationRepository: LocationRepository) { }

    async storeInDb(locationActionDto: LocationActionDto) { 
        // if(locationActionDto.type == locationType.COUNTRY){
        //     const countryDto: CountryDto = new CountryDto({
        //         name: locationActionDto.countryName
        //     });
        //     return this.locationRepository.createCountry(countryDto);
        // }
        // if(locationActionDto.type == locationType.STATE){
        //     const stateDto: StateDto = new StateDto({
        //         name: locationActionDto.stateName,
        //         countryId: locationActionDto.countryId
        //     });
        //     return this.locationRepository.createState(stateDto);
        // }
        // if(locationActionDto.type == locationType.CITY){}

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
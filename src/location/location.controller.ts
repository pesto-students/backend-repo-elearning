import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { LocationService } from "./location.service";
import { LocationActionDto } from "./dto/action/location-action.dto";
import { FetchStateDto } from "./dto/state.dto";
import { FetchCityDto } from "./dto/city.dto";
 
@Controller('location')
export class LocationController{
    constructor(private readonly locationService: LocationService){}

    @Post('country')
    async fetchCountry(@Body() countryId){
        return this.locationService.fetchCountry(countryId);
    }

    @Post('state')
    async fetchState(@Body() condition: FetchStateDto){
        return this.locationService.fetchState(condition);
    }

    @Post('city')
    async fetchCity(@Body() condition: FetchCityDto){
        return this.locationService.fetchCity(condition);
    }

    @Post('search/city')
    async searchCity(@Body() condition){
        return this.locationService.searchCity(condition.keyword, condition?.limit);
    }
 
 }
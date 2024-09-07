import { Body, Controller, Post } from "@nestjs/common";
import { LocationService } from "./location.service";
import { FetchStateDto } from "./dto/state.dto";
import { FetchCityDto } from "./dto/city.dto";
import { ApiBody, ApiTags } from "@nestjs/swagger";

@ApiTags('Location')
@Controller('location')
export class LocationController {
    constructor(private readonly locationService: LocationService) { }

    @Post('country')
    async fetchCountry(@Body() countryId) {
        return this.locationService.fetchCountry(countryId);
    }

    @Post('state')
    async fetchState(@Body() condition: FetchStateDto) {
        return this.locationService.fetchState(condition);
    }

    @Post('city')
    async fetchCity(@Body() condition: FetchCityDto) {
        return this.locationService.fetchCity(condition);
    }

    @Post('search/city')
    @ApiBody({
        description: 'Search for cities based on a keyword and optional limit',
        // type: SearchCityDto,
        examples: {
            a: {
                summary: 'Search without limit',
                value: { keyword: 'Delhi' },  // example of request body
            },
            b: {
                summary: 'Search with limit',
                value: { keyword: 'Delhi', limit: 10 },
            },
        },
    })
    async searchCity(@Body() condition) {
        return this.locationService.searchCity(condition.keyword, condition?.limit);
    }

}
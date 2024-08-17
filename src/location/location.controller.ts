import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { LocationService } from "./location.service";
import { LocationActionDto } from "./dto/action/location-action.dto";
 
@Controller('location')
export class LocationController{
    constructor(private readonly locationService: LocationService){}

    @Post('save')
    async storeInDb(@Body() locationActionDto: LocationActionDto, @Res() res: Response ){
        return this.locationService.storeInDb(locationActionDto);
    }
 

 }
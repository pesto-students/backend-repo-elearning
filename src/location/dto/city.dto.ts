import { IsMongoId, IsOptional } from "class-validator";

export class CityDto{
    
}

export class FetchCityDto{

    @IsOptional()
    @IsMongoId()
    _id: string;

    @IsMongoId()
    stateId: string;

    constructor(partial: Promise<FetchCityDto>){
        Object.assign(this, partial);
    }
}
import { IsOptional, IsString, IsMongoId, IsNotEmpty } from "class-validator";

export class LocationActionDto{
    
    @IsOptional()
    @IsString()
    countryName?: string;
  
    @IsOptional()
    @IsString()
    stateName?: string;
  
    @IsOptional()
    @IsMongoId()
    countryId?: string;
  
    @IsOptional()
    @IsString()
    cityName?: string;
  
    @IsOptional()
    @IsMongoId()
    stateId?: string;
  
    @IsOptional()
    @IsString()
    pincode?: string;
  
    @IsOptional()
    @IsMongoId()
    cityId?: string;

    @IsNotEmpty()
    @IsString()
    type: locationType;

    constructor(partial: Partial<LocationActionDto>){
        Object.assign(this, partial);
    }
}

export enum locationType{
    STATE = 'state',
    COUNTRY = 'country',
    CITY = 'city',
    PINCODE = 'pincode'
}
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class StateDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsMongoId()
    readonly countryId: string;

    constructor(partial: Partial<StateDto>) {
        Object.assign(this, partial);
    }
}

export class FetchStateDto {
    @IsOptional()
    @IsMongoId()
    _id: string;

    @IsOptional()
    @IsMongoId()
    countryId: string;

    constructor(partial: Partial<FetchStateDto>) {
        Object.assign(this, partial);
    }

}
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class StateDto{

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsMongoId()
    readonly countryId: string;

    constructor(partial: Partial<StateDto>){
        Object.assign(this, partial);
    }
}
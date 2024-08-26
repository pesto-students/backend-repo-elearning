import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto{
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    constructor(partial: Promise<LoginDto>){
        Object.assign(this, partial);
    }
}
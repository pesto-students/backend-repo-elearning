import { IsNotEmpty, IsString, IsEmail, IsPhoneNumber, IsMongoId, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateTeacherDto {
    @IsOptional()
    @IsNotEmpty()
    readonly BranchID: Types.ObjectId;

    @IsString()
    @IsNotEmpty()
    readonly FirstName: string;

    @IsString()
    readonly LastName: string;

    @IsEmail()
    @IsNotEmpty()
    readonly Email: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    readonly Phone: string;

    @IsString()
    @IsNotEmpty()
    readonly Address: string;

    @IsMongoId()
    @IsNotEmpty()
    readonly CountryID: Types.ObjectId;

    @IsMongoId()
    @IsNotEmpty()
    readonly StateID: Types.ObjectId;

    @IsMongoId()
    @IsNotEmpty()
    readonly CityID: Types.ObjectId;

    @IsString()
    @IsNotEmpty()
    readonly Pincode: string;
}

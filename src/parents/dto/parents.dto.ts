import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsOptional, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class ParentDto {

    @ApiProperty({ description: 'Student ID to map to the parent' })
    @IsMongoId()
    @IsOptional()
    studentId: Types.ObjectId;


    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    phone: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    countryId: Types.ObjectId;

    @IsNotEmpty()
    stateId: Types.ObjectId;

    @IsNotEmpty()
    cityId: Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    pincode: string;
}

export class DbQueryConditionDto {
    @IsOptional()
    @IsMongoId()
    _id?: Types.ObjectId;

    constructor(partial: Promise<DbQueryConditionDto>) {
        Object.assign(this, partial);
    }
}
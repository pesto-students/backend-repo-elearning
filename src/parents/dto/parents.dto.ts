import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsOptional, IsMongoId, IsArray } from 'class-validator';
import { Types } from 'mongoose';

export class ParentDto {
    @ApiProperty({ description: 'Student IDs to map to the parent', type: [String] })
    @IsArray()
    @IsMongoId({ each: true })
    @IsNotEmpty()
    studentId: Types.ObjectId[];

    @ApiProperty({ description: 'Father Name', type: String })
    @IsNotEmpty()
    @IsString()
    fatherName: string;

    @ApiProperty({ description: 'Mother Name', type: String })
    @IsNotEmpty()
    @IsString()
    motherName: string;

    @ApiProperty({ description: 'Email address of the parent', type: String })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Phone number of the parent', type: String, required: false })
    @IsOptional()
    @IsString()
    phone: string;

    @ApiProperty({ description: 'Address of the parent', type: String })
    @IsNotEmpty()
    @IsString()
    address: string;

    @ApiProperty({ description: 'Country ID', type: String })
    @IsNotEmpty()
    @IsMongoId()
    countryId: Types.ObjectId;

    @ApiProperty({ description: 'State ID', type: String })
    @IsNotEmpty()
    @IsMongoId()
    stateId: Types.ObjectId;

    @ApiProperty({ description: 'City ID', type: String })
    @IsNotEmpty()
    @IsMongoId()
    cityId: Types.ObjectId;

    @ApiProperty({ description: 'Pincode', type: String })
    @IsNotEmpty()
    @IsString()
    pincode: string;

    @ApiProperty({ description: 'Branch ID', type: String })
    @IsOptional()
    @IsMongoId()
    branchId: Types.ObjectId;

    @ApiProperty({ description: 'Organization ID', type: String })
    @IsOptional()
    @IsMongoId()
    organizationId: Types.ObjectId;
}

export class DbQueryConditionDto {
    @ApiProperty({ description: 'Parent ID', type: String, required: false })
    @IsOptional()
    @IsMongoId()
    _id?: Types.ObjectId;

    constructor(partial: Partial<DbQueryConditionDto>) {
        Object.assign(this, partial);
    }
}
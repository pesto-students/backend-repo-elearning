import { IsEmail, IsNotEmpty, IsString, IsMongoId, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { Types } from 'mongoose';

export class CreateOrganizationDto {

  @IsString({ message: "Please enter valid Organization id" })
  @IsNotEmpty()
  organizationId: string;

  @IsMongoId()
  @IsNotEmpty()
  organizationTypeId: Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  countryId: Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  stateId: Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  cityId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  pincode: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsBoolean()
  emailVerified: boolean;

  @IsString()
  @IsNotEmpty()
  password: string
}


export class GetOrganizationQueryDto {
  @IsOptional()
  @IsString()
  organizationId?: string;

  @IsOptional()
  @IsMongoId()
  _id?: string;

  @IsOptional()
  @IsMongoId()
  organizationTypeId?: string;

  constructor(partial: Promise<GetOrganizationQueryDto>) {
    Object.assign(this, partial);
  }
}

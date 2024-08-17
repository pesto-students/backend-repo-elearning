import { IsEmail, IsNotEmpty, IsString, IsMongoId, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateOrganizationDto {

  @IsString({message: "Please enter valid Organization id"})
  @IsNotEmpty()
  OrganizationID: string;

  @IsMongoId()
  @IsNotEmpty()
  OrganizationTypeID: Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  CountryID: Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  StateID: Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  CityID: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  Name: string;

  @IsString()
  @IsNotEmpty()
  Address: string;

  @IsString()
  @IsNotEmpty()
  Pincode: string;

  @IsEmail()
  @IsNotEmpty()
  ContactEmail: string;

  @IsString()
  @IsNotEmpty()
  ContactPhone: string;
}

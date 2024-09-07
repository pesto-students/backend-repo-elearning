 
import { IsNotEmpty, IsString, IsMongoId, IsEmail } from 'class-validator';
import { Types } from 'mongoose';

export class BranchDto{
  
  @IsMongoId()
  @IsNotEmpty()
  organizationId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

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
  pincode: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  constructor(partial: Promise<BranchDto>){
    Object.assign(this, partial);
  }
}

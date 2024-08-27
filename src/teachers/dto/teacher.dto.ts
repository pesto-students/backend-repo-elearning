import { IsString, IsOptional, IsEmail, IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateTeacherDto {
  @IsMongoId()
  @IsNotEmpty()
  branchId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

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
}

export class UpdateTeacherDto {
  @IsOptional()
  @IsMongoId()
  branchId?: Types.ObjectId;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsMongoId()
  countryId?: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  stateId?: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  cityId?: Types.ObjectId;

  @IsOptional()
  @IsString()
  pincode?: string;
}

export class GetTeacherQueryDto {
  @IsOptional()
  @IsMongoId()
  branchId?: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  _id?: Types.ObjectId;


  constructor(partial: Promise<GetTeacherQueryDto>) {
    Object.assign(this, partial);
  }
}
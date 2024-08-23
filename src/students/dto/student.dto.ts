import { IsNotEmpty, IsString, IsDateString, IsEmail, IsPhoneNumber, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class StudentDto {
  @IsNotEmpty()
  branchId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsDateString()
  enrollmentDate: Date;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsPhoneNumber(null)  // Validate based on the phone number format in your locale
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

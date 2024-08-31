import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString, IsEmail, IsPhoneNumber, IsOptional, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class StudentDto {
  @ApiProperty({ description: 'Branch ID of the student' })
  @IsMongoId()
  @IsOptional()
  branchId: Types.ObjectId;

  @ApiProperty({ description: 'Organization ID of the student' })
  @IsMongoId()
  @IsOptional()
  organizationId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  lastName: string;

  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsDateString()
  @IsOptional()
  enrollmentDate: Date;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()  // Validate based on the phone number format in your locale
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

  @ApiProperty({ description: 'password of the student\'s' })
  @IsString()
  @IsOptional()
  password: string;
}

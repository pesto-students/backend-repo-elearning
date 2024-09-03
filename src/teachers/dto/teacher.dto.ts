import { IsString, IsOptional, IsEmail, IsMongoId, IsNotEmpty, IsArray } from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTeacherDto {
  @ApiProperty({ description: 'Branch ID of the teacher' })
  @IsMongoId()
  @IsOptional()
  branchId: Types.ObjectId;

  @ApiProperty({ description: 'Organization ID of the teacher' })
  @IsMongoId()
  @IsOptional()
  organizationId: Types.ObjectId;

  @ApiProperty({ description: 'First name of the teacher' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiPropertyOptional({ description: 'Last name of the teacher' })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ description: 'Email of the teacher' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Phone number of the teacher' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: 'Address of the teacher' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'Country ID of the teacher' })
  @IsMongoId()
  @IsNotEmpty()
  countryId: Types.ObjectId;

  @ApiProperty({ description: 'State ID of the teacher' })
  @IsMongoId()
  @IsNotEmpty()
  stateId: Types.ObjectId;

  @ApiProperty({ description: 'City ID of the teacher' })
  @IsMongoId()
  @IsNotEmpty()
  cityId: Types.ObjectId;

  @ApiProperty({ description: 'Pincode of the teacher\'s address' })
  @IsString()
  @IsNotEmpty()
  pincode: string;

  @ApiProperty({ description: 'password of the teacher\'s' })
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty({ description: 'Class IDs of the teacher assigned to' })
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  classId: Types.ObjectId[];
}

export class UpdateTeacherDto {
  @ApiProperty({ description: 'ID of the teacher to update' })
  @IsNotEmpty()
  @IsMongoId()
  _id: Types.ObjectId;

  @ApiPropertyOptional({ description: 'Branch ID of the teacher' })
  @IsOptional()
  @IsMongoId()
  branchId?: Types.ObjectId;

  @ApiPropertyOptional({ description: 'First name of the teacher' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ description: 'Last name of the teacher' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ description: 'Email of the teacher' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: 'Phone number of the teacher' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ description: 'Address of the teacher' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ description: 'Country ID of the teacher' })
  @IsOptional()
  @IsMongoId()
  countryId?: Types.ObjectId;

  @ApiPropertyOptional({ description: 'State ID of the teacher' })
  @IsOptional()
  @IsMongoId()
  stateId?: Types.ObjectId;

  @ApiPropertyOptional({ description: 'City ID of the teacher' })
  @IsOptional()
  @IsMongoId()
  cityId?: Types.ObjectId;

  @ApiPropertyOptional({ description: 'Pincode of the teacher\'s address' })
  @IsOptional()
  @IsString()
  pincode?: string;
}

export class GetTeacherQueryDto {
  @ApiPropertyOptional({ description: 'Branch ID to filter teachers' })
  @IsOptional()
  @IsMongoId()
  branchId?: Types.ObjectId;

  @ApiPropertyOptional({ description: 'Teacher ID to fetch specific teacher' })
  @IsOptional()
  @IsMongoId()
  _id?: Types.ObjectId;

  constructor(partial: Promise<GetTeacherQueryDto>) {
    Object.assign(this, partial);
  }
}

export class UpdateTeacherEnrollmentsDto {
  @ApiProperty({ description: 'Array of Teacher IDs', type: [String] })
  @IsArray()
  @IsMongoId({ each: true })
  @IsNotEmpty()
  teacherIds: Types.ObjectId[];

  @ApiProperty({ description: 'Array of Class IDs', type: [String] })
  @IsArray()
  @IsMongoId({ each: true })
  @IsNotEmpty()
  classIds: Types.ObjectId[];
}

export class FetchTeacherClassesDto {
  @ApiProperty({ description: 'ID of the teacher' })
  @IsNotEmpty()
  @IsMongoId()
  teacherId: Types.ObjectId;
}

export class DeleteTeachersDto {
  @ApiProperty({ description: 'Array of Teacher IDs to delete', type: [String] })
  @IsArray()
  @IsMongoId({ each: true })
  @IsNotEmpty()
  teacherIds: Types.ObjectId[];
}
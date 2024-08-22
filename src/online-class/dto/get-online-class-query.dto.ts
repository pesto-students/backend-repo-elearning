import { IsOptional, IsString, IsMongoId } from "class-validator";
import { Types } from "mongoose";

export class GetOnlineClassQueryDto {
    @IsOptional()
    @IsMongoId()
    branchId?: Types.ObjectId;
  
    @IsOptional()
    @IsMongoId()
    _id?: Types.ObjectId;
  
    @IsOptional()
    @IsMongoId()
    createdBy?: Types.ObjectId;

    @IsOptional()
    @IsMongoId()
    classId?: Types.ObjectId;

    @IsOptional()
    @IsString()
    title?: string;
  
    constructor(partial: Promise<GetOnlineClassQueryDto>) {
      Object.assign(this, partial);
    }
  }
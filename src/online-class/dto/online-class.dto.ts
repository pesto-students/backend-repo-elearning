import { IsNotEmpty, IsString, IsOptional, IsDateString, IsMongoId } from "class-validator";
import { Types } from "mongoose";

export class OnlineClassDto {
    @IsNotEmpty()
    @IsMongoId()
    branchId: Types.ObjectId;

    @IsNotEmpty()
    @IsMongoId()
    classId: Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsDateString()
    scheduledDate: Date;

    @IsNotEmpty()
    @IsString()
    startTime: string;

    @IsNotEmpty()
    @IsString()
    endTime: string;

    @IsNotEmpty()
    @IsString()
    meetingLink: string;

    @IsOptional()  // Assume it's optional; can be made required based on business logic
    @IsMongoId()
    createdBy?: Types.ObjectId;

    constructor(partial: Partial<OnlineClassDto>){
        Object.assign(this, partial);
    }
}
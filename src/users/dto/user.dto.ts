import { IsMongoId, IsString } from "class-validator";
import { Types } from "mongoose";

export class IsUserExistDto{
    @IsMongoId()
    branchId: Types.ObjectId;
  
    @IsMongoId()
    organizationId: Types.ObjectId;

    @IsString()
    username: string;

    @IsString()
    userType: string;
}
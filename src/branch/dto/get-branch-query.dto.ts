import { IsOptional, IsString, IsMongoId } from "class-validator";
import { Types } from "mongoose";
 
export class GetBranchQueryDto{ 

    @IsOptional()
    @IsMongoId()
    organizationId?: Types.ObjectId;
    
    @IsOptional()
    @IsMongoId()
    _id?: Types.ObjectId;
   
    constructor(partial: Promise<GetBranchQueryDto>){
      Object.assign(this, partial); 
    }
}
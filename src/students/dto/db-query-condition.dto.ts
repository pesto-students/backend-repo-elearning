import { IsOptional, IsMongoId } from "class-validator";
import { Types } from "mongoose"; 

export class DbQueryConditionDto{
    @IsOptional()
    @IsMongoId()
    branchId?: Types.ObjectId;
    
    @IsOptional()
    @IsMongoId()
    _id?:  Types.ObjectId;
     
   
    constructor(partial: Promise<DbQueryConditionDto>){
      Object.assign(this, partial);
    }
}
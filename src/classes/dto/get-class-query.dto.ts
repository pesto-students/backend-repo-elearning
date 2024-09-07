import { IsOptional, IsMongoId } from "class-validator";
import { Types } from "mongoose"; 

export class GetClassQueryDto{
    @IsOptional()
    @IsMongoId()
    branchId?: Types.ObjectId;
    
    @IsOptional()
    @IsMongoId()
    _id?: Types.ObjectId;
   
    constructor(partial: Promise<GetClassQueryDto>){
      Object.assign(this, partial); 
    }
}
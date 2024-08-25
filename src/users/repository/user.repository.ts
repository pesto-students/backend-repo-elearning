import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserType } from "src/core/schemas/user-type.schema";

@Injectable()
export class UserRepository{
    constructor(
        @InjectModel(UserType.name) private userTypeModel: Model<UserType>,
    ){}

    async createUserType(userTypeDto): Promise<boolean>{
        const createUserType = new this.userTypeModel(userTypeDto);
        const res = await createUserType.save(); 
        return res ? true : false;
    }

    async insertAuthUser(){}

    async fetchUserType(){}

    async fetchAuthUser(){}

}
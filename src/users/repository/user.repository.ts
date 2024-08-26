import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { Auth } from "src/core/schemas/auth.schema";
import { UserType } from "src/core/schemas/user-type.schema";
import { User } from "../users.service";
import { transformId } from "src/core/utils/mongo-res.utils";

@Injectable()
export class UserRepository{
    constructor(
        @InjectModel(UserType.name) private userTypeModel: Model<UserType>,
        @InjectModel(Auth.name) private authModel: Model<Auth>,
    ){}

    async createUserType(userTypeDto): Promise<boolean>{
        const createUserType = new this.userTypeModel(userTypeDto);
        const res = await createUserType.save(); 
        return res ? true : false;
    } 

    async findOne(query: FilterQuery<Auth>): Promise<Auth | null> {
        return await this.authModel.findOne(query).exec();
      }
    
      async findOneById(id: string): Promise<Auth | null> {
        return await this.authModel.findById(id).exec();
      }

      /**
   * Common update function to update user fields based on a filter query.
   * @param filter - The filter query to locate the user (e.g., userId, username).
   * @param updateData - The fields and values to update.
   * @returns The updated user document.
   */
    async updateUser(
        filter: FilterQuery<Auth>,
        updateData: UpdateQuery<Auth>,
    ): Promise<Auth | null> {
        const updatedUser = await this.authModel.findOneAndUpdate(
        filter,
        { $set: updateData },
        { new: true }, // Return the updated document
        ).exec();

        return transformId(updatedUser);
    }

}
import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose"; 
import { OnlineClass } from "src/core/schemas/online-class.schema";
import { OnlineClassDto } from "../dto/online-class.dto";
import { GetOnlineClassQueryDto } from "../dto/get-online-class-query.dto";
import { OnlineClassWithDetails } from "src/core/interface/online-class.interface";

@Injectable()
export class OnlineClassRepository{
    constructor(@InjectModel(OnlineClass.name) private onlineClassModel: Model<OnlineClass>){}

    async create(onlineClassDto: OnlineClassDto): Promise<boolean> {
        try {
          const createTeacher = new this.onlineClassModel(onlineClassDto);
          const res = await createTeacher.save(); 
          return res ? true: false;
        } catch (error) {
          if (error.code === 11000) { // MongoDB duplicate key error code
            throw new ConflictException('online class already exists');
          }
          throw error; 
        }
      }

      async fetchOnlineClassWithDetails(condition: GetOnlineClassQueryDto): Promise<any> {
        try {
            const query = {};

                if (condition.branchId) {
                    query['branchId'] = new Types.ObjectId(condition.branchId);
                }

                if (condition._id) {
                    query['_id'] = new Types.ObjectId(condition._id);
                }
          const result: OnlineClassWithDetails[] = await this.onlineClassModel.aggregate([
            { $match: { ...query } },
            {
              $lookup: {
                from: 'branches',
                localField: 'branchId',
                foreignField: '_id',
                as: 'branch'
              }
            },
            { $unwind: { path: '$branch', preserveNullAndEmptyArrays: true } },
            {
              $lookup: {
                from: 'classes',
                localField: 'classId',
                foreignField: '_id',
                as: 'class'
              }
            },
            { $unwind: { path: '$class', preserveNullAndEmptyArrays: true } },
            {
              $project: {
                _id: 1,
                title: 1,
                description: 1, 
                branch: {
                  _id: '$branch._id',
                  name: '$branch.name'
                },
              }
            }
          ]).exec();
    
          return result.length > 0 ? JSON.parse(JSON.stringify(result, null, 2)): null;
        } catch (error) {
          console.error('Error fetching online class with details:', error);
          throw new Error('Error fetching online class with details');
        }
      }

}
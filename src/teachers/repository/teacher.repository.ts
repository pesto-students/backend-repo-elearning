import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Teacher } from "src/core/schemas/teacher.schema";
import { CreateTeacherDto, GetTeacherQueryDto } from "../dto/teacher.dto";
import { TeacherWithDetails } from "src/core/interface/teacher.interface";

@Injectable()
export class TeacherRepository {
  constructor(@InjectModel(Teacher.name) private teacherModel: Model<Teacher>) { }

  async create(teacherDto: CreateTeacherDto): Promise<boolean> {
    try {
      const createTeacher = new this.teacherModel({ ...teacherDto, branchId: '66cb9b846b0566074b381f85' });
      const res = await createTeacher.save();
      return res ? true : false;
    } catch (error) {
      if (error.code === 11000) { // MongoDB duplicate key error code
        throw new ConflictException('Teacher already exists');
      }
      throw error;
    }
  }

  async fetchTeacherWithDetails(condition: GetTeacherQueryDto): Promise<any> {
    try {
      const query = {};

      if (condition.branchId) {
        query['branchId'] = new Types.ObjectId(condition.branchId);
      }

      if (condition._id) {
        query['_id'] = new Types.ObjectId(condition._id);
      }
      const result: TeacherWithDetails[] = await this.teacherModel.aggregate([
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
            from: 'cities',
            localField: 'cityId',
            foreignField: '_id',
            as: 'city'
          }
        },
        { $unwind: { path: '$city', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: 'states',
            localField: 'stateId',
            foreignField: '_id',
            as: 'state'
          }
        },
        { $unwind: { path: '$state', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: 'countries',
            localField: 'countryId',
            foreignField: '_id',
            as: 'country'
          }
        },
        { $unwind: { path: '$country', preserveNullAndEmptyArrays: true } },
        {
          $project: {
            _id: 1,
            name: 1,
            address: 1,
            pincode: 1,
            email: 1,
            phone: 1,
            branch: {
              _id: '$branch._id',
              name: '$branch.name'
            },
            city: {
              _id: '$city._id',
              name: '$city.name'
            },
            state: {
              _id: '$state._id',
              name: '$state.name'
            },
            country: {
              _id: '$country._id',
              name: '$country.name'
            }
          }
        }
      ]).exec();

      return result.length > 0 ? JSON.parse(JSON.stringify(result, null, 2)) : null;
    } catch (error) {
      console.error('Error fetching teacher with details:', error);
      throw new Error('Error fetching teacher with details');
    }
  }

}
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Teacher } from "src/core/schemas/teacher.schema";
import { CreateTeacherDto, GetTeacherQueryDto, UpdateTeacherDto } from "../dto/teacher.dto";
import { TeacherWithDetails } from "src/core/interface/teacher.interface";
import { UserTypeEnum } from "src/core/enums/user-type.enum";
import { UserService } from "src/users/users.service";

@Injectable()
export class TeacherRepository {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
    private userService: UserService
  ) { }

  async create(teacherData: CreateTeacherDto): Promise<string> {
    const session = await this.teacherModel.db.startSession();
    session.startTransaction();

    try {
      const { password, organizationId, ...teacherObj } = teacherData;
      const teacher = await this.teacherModel.create([teacherObj], { session });

      const authData = {
        userId: teacher[0]._id.toString(),
        username: teacher[0].email,
        name: `${teacher[0].firstName} ${teacher[0].lastName}`,
        password: password,
        isVerified: false,
        userType: UserTypeEnum.TEACHER,
        branchId: teacherData.branchId,
        organizationId: teacherData.organizationId
      }

      await this.userService.createAuth(authData, session);

      await session.commitTransaction();

      return teacher[0]._id.toString();
    } catch (error) {
      await session.abortTransaction();

      if (error.code === 11000) { // MongoDB duplicate key error code
        throw new ConflictException('Teacher ID already exists');
      }
      throw error;
    } finally {
      session.endSession();
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
            firstName: 1,
            lastName: 1,
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

  async update(updateTeacherDto: UpdateTeacherDto): Promise<Teacher> {
    try {
      const { _id, ...updateData } = updateTeacherDto;
      const updatedTeacher = await this.teacherModel.findByIdAndUpdate(
        _id,
        updateData,
        { new: true, runValidators: true }
      );
      if (!updatedTeacher) {
        throw new NotFoundException('Teacher not found');
      }
      return updatedTeacher;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email or phone number already exists');
      }
      throw error;
    }
  }
}
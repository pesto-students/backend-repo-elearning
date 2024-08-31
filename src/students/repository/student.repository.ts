import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { StudentWithDetailsInterface } from "src/core/interface/student.interface";
import { Student } from "src/core/schemas/student.schema";
import { DbQueryConditionDto } from "../dto/db-query-condition.dto";
import { StudentDto } from "../dto/student.dto";
import { UserTypeEnum } from "src/core/enums/user-type.enum";
import { UserService } from "src/users/users.service";

@Injectable()
export class StudentRepository{
    constructor(
        @InjectModel(Student.name) private studentModel: Model<Student>,
        private userService: UserService
    ){}

    async create(studentData: StudentDto): Promise<string> {
      const session = await this.studentModel.db.startSession();
    session.startTransaction();
        try { 
          const { password, organizationId, ...studentObj } = studentData;
          const createStudet = await this.studentModel.create([studentObj], { session });
          const authData = {
            userId: createStudet[0]._id.toString(),
            username: createStudet[0].email,
            name: `${studentData.firstName} ${studentData.lastName}`,
            password: password,
            isVerified: false,
            userType: UserTypeEnum.STUDENT,
            branchId: createStudet[0].branchId.toString(),
            organizationId
          }
    
          await this.userService.createAuth(authData, session);
    
          await session.commitTransaction();
          return createStudet[0]._id.toString();
        } catch (error) {
          await session.abortTransaction();
          if (error.code === 11000) { // MongoDB duplicate key error code
            throw new ConflictException('Student already exists');
          }
          throw error; 
        } finally {
          session.endSession();
        }
      }

      async fetchStudentWithDetails(condition: DbQueryConditionDto): Promise<any> {
        try {
            const query = {};

                if (condition.branchId) {
                    query['branchId'] = new Types.ObjectId(condition.branchId);
                }

                if (condition._id) {
                    query['_id'] = new Types.ObjectId(condition._id);
                }
          const result: StudentWithDetailsInterface[] = await this.studentModel.aggregate([
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
                dateOfBirth: 1,
                gender: 1,
                enrollmentDate: 1,
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
    
          return result.length > 0 ? JSON.parse(JSON.stringify(result, null, 2)): null;
        } catch (error) {
          console.error('Error fetching student with details:', error);
          throw new Error('Error fetching student with details');
        }
      }
}
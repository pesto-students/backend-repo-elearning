import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Class } from "src/core/schemas/class.schema";
import { ClassDto } from "../dto/class.dto";
import { GetClassQueryDto } from "../dto/get-class-query.dto";
import { ClassWithDetails } from "src/core/interface/class.interface";
import { DEFAULT_BRANCH_ID } from "src/core/utils/string.utils";

@Injectable()
export class ClassRepository {
    constructor(
        @InjectModel(Class.name) private classModel: Model<Class>,
    ) { }

    async create(classDto: ClassDto): Promise<boolean> {
        try {
            const createClass = new this.classModel({ ...classDto, ...DEFAULT_BRANCH_ID });
            const res = await createClass.save();
            return res ? true : false;
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('Class already exists');
            }
            throw error;
        }
    }

    async fetchBranchWithDetails(condition: GetClassQueryDto): Promise<any> {
        try {
            const query = {};

            if (condition.branchId) {
                query['branchId'] = new Types.ObjectId(condition.branchId);
            }

            if (condition._id) {
                query['_id'] = new Types.ObjectId(condition._id);
            }
            const result: ClassWithDetails[] = await this.classModel.aggregate([
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
                    $project: {
                        _id: 1,
                        className: 1,
                        branch: {
                            _id: '$branch._id',
                            name: '$branch.name'
                        },
                    }
                }
            ]).exec();

            return result.length > 0 ? JSON.parse(JSON.stringify(result, null, 2)) : null;
        } catch (error) {
            console.error('Error fetching class with details:', error);
            throw new Error('Error fetching class with details');
        }
    }
}
import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Parent } from "src/core/schemas/parent.schema";
import { ParentDto } from "../dto/parents.dto";
import { transformId } from "src/core/utils/mongo-res.utils";

@Injectable()
export class ParentsRepository {
    constructor(
        @InjectModel(Parent.name) private parentModel: Model<Parent>,
    ) { }

    async create(parentData: ParentDto): Promise<string> {
        const session = await this.parentModel.db.startSession();
        session.startTransaction();
        try {
            const createParent = await this.parentModel.create([parentData], { session });
            await session.commitTransaction();
            return createParent[0]._id.toString();
        } catch (error) {
            await session.abortTransaction();
            if (error.code === 11000) { // MongoDB duplicate key error code
                throw new ConflictException('Parent already exists');
            }
            throw error;
        } finally {
            session.endSession();
        }
    }

    async fetchParentWithDetails(condition): Promise<any> {
        try {
            const query = {};

            if (condition.branchId) {
                query['branchId'] = new Types.ObjectId(condition.branchId);
            }

            if (condition._id) {
                query['_id'] = new Types.ObjectId(condition._id);
            }

            const result = await this.parentModel.aggregate([
                { $match: query },
                {
                    $lookup: {
                        from: 'students',
                        let: { studentIds: { $map: { input: '$studentId', in: { $toObjectId: '$$this' } } } },
                        pipeline: [
                            { $match: { $expr: { $in: ['$_id', '$$studentIds'] } } },
                            {
                                $project: {
                                    _id: { $toString: '$_id' },
                                    firstName: 1,
                                    lastName: 1,
                                    dateOfBirth: 1,
                                    gender: 1,
                                    email: 1,
                                    phone: 1,
                                    address: 1,
                                    pincode: 1,
                                    branchId: { $toString: '$branchId' },
                                    countryId: { $toString: '$countryId' },
                                    stateId: { $toString: '$stateId' },
                                    cityId: { $toString: '$cityId' },
                                    enrollmentDate: 1
                                }
                            }
                        ],
                        as: 'students'
                    }
                },
                {
                    $lookup: {
                        from: 'countries',
                        let: { countryId: { $toObjectId: '$countryId' } },
                        pipeline: [
                            { $match: { $expr: { $eq: ['$_id', '$$countryId'] } } },
                            { $project: { _id: { $toString: '$_id' }, name: 1 } }
                        ],
                        as: 'country'
                    }
                },
                { $unwind: { path: '$country', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: 'states',
                        let: { stateId: { $toObjectId: '$stateId' } },
                        pipeline: [
                            { $match: { $expr: { $eq: ['$_id', '$$stateId'] } } },
                            { $project: { _id: { $toString: '$_id' }, name: 1 } }
                        ],
                        as: 'state'
                    }
                },
                { $unwind: { path: '$state', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: 'cities',
                        let: { cityId: { $toObjectId: '$cityId' } },
                        pipeline: [
                            { $match: { $expr: { $eq: ['$_id', '$$cityId'] } } },
                            { $project: { _id: { $toString: '$_id' }, name: 1 } }
                        ],
                        as: 'city'
                    }
                },
                { $unwind: { path: '$city', preserveNullAndEmptyArrays: true } },
                {
                    $project: {
                        _id: { $toString: '$_id' },
                        fatherName: 1,
                        motherName: 1,
                        email: 1,
                        phone: 1,
                        address: 1,
                        pincode: 1,
                        students: 1,
                        country: '$country',
                        state: '$state',
                        city: '$city'
                    }
                }
            ]).exec();

            return result;
        } catch (error) {
            console.error('Error fetching parent with details:', error);
            throw new Error('Error fetching parent with details');
        }
    }

    async update(id: string, parentDto: ParentDto) {
        return await this.parentModel.findByIdAndUpdate(id, parentDto, { new: true }).exec();
    }

    // async remove(id: string) {
    //     return await this.parentModel.findByIdAndRemove(id).exec();
    // }
}

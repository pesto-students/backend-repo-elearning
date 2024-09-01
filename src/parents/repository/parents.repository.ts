import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Parent } from "src/core/schemas/parent.schema";
import { ParentDto, DbQueryConditionDto } from "../dto/parents.dto";

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

    async fetchParentWithDetails(condition: DbQueryConditionDto): Promise<any> {
        try {
            const query = {};

            if (condition.branchId) {
                query['branchId'] = new Types.ObjectId(condition.branchId);
            }

            if (condition._id) {
                query['_id'] = new Types.ObjectId(condition._id);
            }

            const result = await this.parentModel.aggregate([
                { $match: { ...query } },
                // Add necessary lookups and projections here
            ]).exec();

            return result.length > 0 ? JSON.parse(JSON.stringify(result, null, 2)) : null;
        } catch (error) {
            console.error('Error fetching parent with details:', error);
            throw new Error('Error fetching parent with details');
        }
    }

    async update(id: string, parentDto: ParentDto) {
        return await this.parentModel.findByIdAndUpdate(id, parentDto, { new: true }).exec();
    }

    async remove(id: string) {
        return await this.parentModel.findByIdAndRemove(id).exec();
    }
}

import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Branch } from "src/core/schemas/branch.schema";
import { City } from "src/core/schemas/city.schema";
import { Country } from "src/core/schemas/country.schema";
import { Organization } from "src/core/schemas/organization.schema";
import { State } from "src/core/schemas/state.schema";
import { BranchDto } from "../dto/branch.dto";
import { GetBranchQueryDto } from "../dto/get-branch-query.dto";
import { BranchWithDetails } from "src/core/interface/branch.interface";

@Injectable()
export class BranchRepository {
    constructor(
        @InjectModel(Branch.name) private branchModel: Model<Branch>,
        @InjectModel(Country.name) private countryModel: Model<Country>,
        @InjectModel(State.name) private stateModel: Model<State>,
        @InjectModel(City.name) private cityModel: Model<City>,
        @InjectModel(Organization.name) private organizationModel: Model<Organization>,
    ) { }

    async create(branchDto: BranchDto): Promise<boolean> {
        try {
            const createBranch = new this.branchModel(branchDto);
            const res = await createBranch.save();
            return res ? true : false;
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('Organization ID already exists');
            }
            throw error;
        }
    }

    async fetchBranchWithDetails(condition: GetBranchQueryDto): Promise<any> {
        try { 
            const query = {};

                if (condition.organizationId) {
                query['organizationId'] = new Types.ObjectId(condition.organizationId);
                }

                if (condition._id) {
                query['_id'] = new Types.ObjectId(condition._id);
                }
            const result: BranchWithDetails[] = await this.branchModel.aggregate([
                { $match: { ...query } },
                {
                    $lookup: {
                        from: 'organizations',
                        localField: 'organizationId',
                        foreignField: '_id',
                        as: 'organization'
                    }
                },
                { $unwind: { path: '$organization', preserveNullAndEmptyArrays: true } },
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
                        // organiZation: {
                        //     _id: '$organiZation._id',
                        //     name: '$organiZation.name'
                        // },
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
            console.error('Error fetching branch with details:', error);
            throw new Error('Error fetching branch with details');
        }
    }
}

import { ConflictException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, Types } from "mongoose";
import { Organization } from "src/core/schemas/organization.schema";
import { CreateOrganizationDto, GetOrganizationQueryDto } from "../dto/create-organization.dto";
import { UpdateOrganizationDto } from "../dto/update-organization.dto";
import { OrganizationType } from "src/core/schemas/organization-type.schema";
import { transformId } from "src/core/utils/mongo-res.utils";
import { State } from "src/core/schemas/state.schema";
import { City } from "src/core/schemas/city.schema";
import { Country } from "src/core/schemas/country.schema";
import { OrganizationWithDetails } from "src/core/interface/organization.interface";

@Injectable()
export class OrganizationRepository {
  constructor(
    @InjectModel(Organization.name) private organizationModel: Model<Organization>,
    @InjectModel(OrganizationType.name) private organizationTypeModel: Model<OrganizationType>,
    @InjectModel(Country.name) private countryModel: Model<Country>,
    @InjectModel(State.name) private stateModel: Model<State>,
    @InjectModel(City.name) private cityModel: Model<City>,
  ) { }

  async create(createOrganizationDto: CreateOrganizationDto): Promise<boolean> {
    try {
      const createdOrganization = new this.organizationModel(createOrganizationDto);
      const res = await createdOrganization.save();
      return res ? true : false;
    } catch (error) {
      if (error.code === 11000) { // MongoDB duplicate key error code
        throw new ConflictException('Organization ID already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<Organization[]> {
    return this.organizationModel.find().exec();
  }

  async findOne(id: string): Promise<Organization> {
    return this.organizationModel.findById(id).exec();
  }

  async update(id: string, updateOrganizationDto: UpdateOrganizationDto): Promise<Organization> {
    return this.organizationModel.findByIdAndUpdate(id, updateOrganizationDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Organization> {
    return this.organizationModel.findByIdAndDelete(id).exec();
  }

  async createOrganizationType(organizationType: string): Promise<OrganizationType> {
    const createOrganizationType = await new this.organizationTypeModel(organizationType);
    return createOrganizationType.save();
  }

  async fetchOrganizationType() {
    const orgType: OrganizationType[] = await this.organizationTypeModel.find().lean().exec();
    return transformId(orgType);
  }

  async findOrganization(condition: GetOrganizationQueryDto): Promise<Organization[]> {
    try {
      const organization: Organization[] = await this.organizationModel.find(condition).lean().exec();
      return transformId(organization);
    } catch (error) {
      return null;
    }
  }

  async countOrganizations(condition: GetOrganizationQueryDto): Promise<number> {
    try {
      const count: number = await this.organizationModel.countDocuments(condition).exec();
      return count;
    } catch (error) {
      // Optionally handle the error, log it, or rethrow it
      console.error('Error counting organizations:', error);
      throw new Error('Error counting organizations');
    }
  }

  async fetchOrganizationWithDetails(condition: GetOrganizationQueryDto): Promise<any> {
    try {

      const result: OrganizationWithDetails[] = await this.organizationModel.aggregate([
        { $match: { ...condition } },
        {
          $lookup: {
            from: 'organizationtypes',
            localField: 'organizationTypeId',
            foreignField: '_id',
            as: 'organizationtype'
          }
        },
        { $unwind: { path: '$organizationtype', preserveNullAndEmptyArrays: true } },
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
            organiZationType: {
              _id: '$organizationtype._id',
              name: '$organizationtype.name'
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
      console.error('Error fetching organization with details:', error);
      throw new Error('Error fetching organization with details');
    }
  }

}
import { Injectable } from "@nestjs/common";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { CreateOrganizationDto, GetOrganizationQueryDto } from "./dto/create-organization.dto";
import { OrganizationRepository } from "./repository/organization.repository";
import { Organization } from "src/core/schemas/organization.schema";

@Injectable()
export class OrganizationService {

    constructor(private readonly organizationRepository: OrganizationRepository) { }

    async create(createOrganizationDto: CreateOrganizationDto) {
        const condition: GetOrganizationQueryDto = {
            organizationId: createOrganizationDto?.organizationId
        };
        const isOrgExist: number = await this.organizationRepository.countOrganizations(condition);
        if(isOrgExist){
            return "Organization already exist with Organization ID";
        }
        return await this.organizationRepository.create(createOrganizationDto);
    }

    async organizationType(organizationType: string) {
        return await this.organizationRepository.createOrganizationType(organizationType);
    }

    async fetchOrganizationType(): Promise<any> {
        return await this.organizationRepository.fetchOrganizationType();
    }

    async fetchOrganization(condition: GetOrganizationQueryDto): Promise<Organization[]> {
        return await this.organizationRepository.fetchOrganizationWithDetails(condition);
    }

}
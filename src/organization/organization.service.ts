import { Injectable } from "@nestjs/common";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { OrganizationRepository } from "./repository/organization.repository";

@Injectable()
export class OrganizationService{

    constructor(private readonly organizationRepository: OrganizationRepository){}

    async create(createOrganizationDto: CreateOrganizationDto){
        return await this.organizationRepository.create(createOrganizationDto);
    }

    async organizationType(organizationType:string){ 
        return await this.organizationRepository.createOrganizationType(organizationType);  
    }

    async fetchOrganizationType(): Promise<any>{ 
       return await this.organizationRepository.fetchOrganizationType();     
    }

}
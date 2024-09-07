import { Injectable } from "@nestjs/common";
import { CreateOrganizationDto, GetOrganizationQueryDto } from "./dto/create-organization.dto";
import { OrganizationRepository } from "./repository/organization.repository";
import { Organization } from "src/core/schemas/organization.schema";
import { AuthUtils } from "src/core/utils/auth.utils";
import { UserService } from "src/users/users.service"; 
import { AuthService } from "src/auth/auth.service";
import { ApiResponseDto } from "src/core/dto/api-response.dto";
import { Types } from "mongoose";

@Injectable()
export class OrganizationService {

    constructor(
        private readonly organizationRepository: OrganizationRepository,
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) { }

    async create(organizationData): Promise<ApiResponseDto>{

        const organizationObj = {
            organizationId: organizationData?.organizationId,
            organizationTypeId: organizationData?.organizationTypeId?.id,
            countryId: organizationData?.countryId?.id,
            stateId: organizationData?.stateId?.id,
            cityId: organizationData?.cityId?.id,
            name: organizationData?.name,
            address: organizationData?.address,
            pincode: organizationData?.pincode,
            email: organizationData?.email,
            phone: organizationData?.phone,
            password: organizationData?.password
        }
        const condition: GetOrganizationQueryDto = {
            organizationId: organizationData?.organizationId
        };
 
        const isOrgExist: number = await this.organizationRepository.countOrganizations(condition);
        if(isOrgExist){
            return new ApiResponseDto(false,"Organization already exist with Organization ID");
        }

        const hasPassword: string = await AuthUtils.createPasswordHash(organizationObj?.password);
        organizationObj.password = hasPassword;
        
        const res: string = await this.organizationRepository.create(organizationObj);
        if(Types.ObjectId.isValid(res)){
            const verificationLink: string = await this.authService.createVerificationLink({name: organizationObj.name, email: organizationObj.email})
            try{
                await this.userService.sendWelcomeEmail({name: organizationObj.name, email: organizationObj.email, password: organizationData?.password, username: organizationObj.email});
            await this.userService.sendVerificationMail(
                {
                    name: organizationObj.name, 
                    email: organizationObj.email, 
                    verificationLink,
                    currentYear:  new Date().getFullYear()
                });
            }catch(error){
                console.log("error occured during sending mail");
            }
            const orgData = await this.fetchOrganization({_id: new Types.ObjectId(res)});
            return new ApiResponseDto(true, "Organization created successfully", orgData);
        }else{
            return new ApiResponseDto(false, "Organization not created, please try again");
        }
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
import { Injectable } from "@nestjs/common";
import { ModuleManagementRepository } from "./repository/module-management.repository";
import { UserTypeEnum } from "src/core/enums/user-type.enum";
import { ApiResponseDto } from "src/core/dto/api-response.dto";

@Injectable()
export class ModuleManagementService{
    constructor(
        private moduleManagementRepository: ModuleManagementRepository
    ){}

    async subscribeModule(subscriptionData, request): Promise<ApiResponseDto>{

        subscriptionData = {
            ...subscriptionData,
            branchId: request.userSession.branchId,
            organizationId: request.userSession.organizationId, 
        }

        if(request.userSession.userType === UserTypeEnum.ORG_ADMIN){
            const res = await this.moduleManagementRepository.subscribeModule(subscriptionData);
            return new ApiResponseDto(true, 'Module subscribed successfully', res);
        }
        
        return new ApiResponseDto(false, 'Permission denied');
        
    }

    async unSubscribeModule(unsubscriptionData, request){
        unsubscriptionData = {
            ...unsubscriptionData,
            branchId: request.userSession.branchId,
            organizationId: request.userSession.organizationId, 
        }

        if(request.userSession.userType === UserTypeEnum.ORG_ADMIN){
            const res = await this.moduleManagementRepository.unsubscribeModule(unsubscriptionData);
            return new ApiResponseDto(true, 'Module unsubscribed successfully', res);
        }
        
        return new ApiResponseDto(false, 'Permission denied');
    }

    async isModuleEnabled(organizationId: string, moduleId: string, branchId: string): Promise<boolean> {
        return this.moduleManagementRepository.isModuleEnabled(organizationId, moduleId, branchId);
    }

    async getModulesWithSubscription(request){
        const branchId: string = request.userSession.branchId;
        const organizationId: string = request.userSession.organizationId;
        return await this.moduleManagementRepository.getModulesWithSubscription(organizationId, branchId);
    }
}
import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ModuleManagementService } from "./module-management.service";
import { PassportJwtAuthGuard } from "src/auth/guards/passport-jwt.guard";

@Controller('module-management')
@UseGuards(PassportJwtAuthGuard)

export class ModuleManagementController{
    constructor(
        private moduleManagementService: ModuleManagementService
    ){}

    @Post('subscribe')
    async subscribeModule(@Body() subscriptionData, @Request() request){
        return await this.moduleManagementService.subscribeModule(subscriptionData, request);
    }

    @Post('unsubscribe')
    async unSubscribeModule(@Body() unsubscriptionData, @Request() request){
        this.moduleManagementService.unSubscribeModule(unsubscriptionData, request);
    }

    @Post('modules')
    async getModulesWithSubscription(
      @Body('organizationId') body, @Request() request
    ): Promise<{ modules: any[] }> {
      const modules = await this.moduleManagementService.getModulesWithSubscription(request);
      return { modules };
    }
}
import { Body, Controller, Post, Res, Get } from "@nestjs/common";
import { OrganizationService } from "./organization.service";
import { CreateOrganizationDto, GetOrganizationQueryDto } from "./dto/create-organization.dto";

@Controller('organization')
export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService){}

    @Post('create')
    async create(@Body() createOrganizationDto: CreateOrganizationDto){ 
      return await this.organizationService.create(createOrganizationDto); 
    }

    @Post('fetch')
    async fetchOrganization(@Body() condition: GetOrganizationQueryDto){
      return await this.organizationService.fetchOrganization(condition);
    }

    @Post('organizationType/save')
    async saveOrganizationType(@Body() organizationType, @Res() res: Response){
       return await this.organizationService.organizationType(organizationType);
    }

    @Get('organizationType/fetch')
    async fetchOrganiationType(){
      return await this.organizationService.fetchOrganizationType();
    }
   
}
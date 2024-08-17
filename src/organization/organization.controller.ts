import { Body, Controller, HttpStatus, Post, Res, Get, Param } from "@nestjs/common";
import { OrganizationService } from "./organization.service";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { OrganizationTypeEnum } from "src/core/enums/organization-type.enum";

@Controller('organization')
export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService){}

    @Post('create')
    async create(@Body() createOrganizationDto: CreateOrganizationDto, @Res() res: Response){ 
      return await this.organizationService.create(createOrganizationDto); 
    }

    @Post('organizationType/save')
    async saveOrganizationType(@Body() organizationType, @Res() res: Response){
       return await this.organizationService.organizationType(organizationType);
    }

    @Get('organizationType/fetch')
    async fetchOrganiationType(){
      const organizationType = await this.organizationService.fetchOrganizationType();
      console.log('Fetched Data:', organizationType); // Log the fetched data 
      return organizationType;
    }


   
}
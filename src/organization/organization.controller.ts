import { Body, Controller, Post } from "@nestjs/common";
import { OrganizationService } from "./organization.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) { }

  @Post('create')
  async create(@Body() createOrganizationDto) {
    return await this.organizationService.create(createOrganizationDto);
  }

  @ApiOperation({ summary: 'Fetch organization type' })
  @ApiResponse({ status: 200, description: 'organization type retrieved successfully' })
  @Post('organizationType/fetch')
  async fetchOrganizationType(@Body() body) {
    return await this.organizationService.fetchOrganizationType();
  }

}
import { Controller, Get } from '@nestjs/common';
import { OrganizationSchemaService } from './organization.schema.service';

@Controller('schema')
export class OrganizationSchemaController {
  constructor(private readonly schemaService: OrganizationSchemaService) {}

  @Get('organization')
  getOrganizationSchemaMetadata() {
    return this.schemaService.getSchemaMetadata();
  }
}

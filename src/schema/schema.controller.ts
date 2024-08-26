import { Controller, Get, Param } from '@nestjs/common';
import { SchemaService } from './schema.service';

@Controller('schema')
export class SchemaController {
    constructor(private readonly schemaService: SchemaService) {}

    @Get(':schemaName')
    getSchemaMetadata(@Param('schemaName') schemaName: string) {
        return this.schemaService.getSchemaMetadata(schemaName);
    }
}

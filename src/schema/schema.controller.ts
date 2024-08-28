import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { SchemaService } from './schema.service';
import { PassportJwtAuthGuard } from 'src/auth/guards/passport-jwt.guard';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('Schema')
@Controller('schema')
export class SchemaController {
    constructor(private readonly schemaService: SchemaService) { }

    @Get(':schemaName')
    @ApiOperation({ summary: 'Get schema metadata' })
    @ApiParam({ name: 'schemaName', description: 'Name of the schema' })
    // @UseGuards(PassportJwtAuthGuard)
    getSchemaMetadata(@Param('schemaName') schemaName: string) {
        return this.schemaService.getSchemaMetadata(schemaName);
    }
}

import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { SchemaService } from './schema.service';
import { PassportJwtAuthGuard } from 'src/auth/guards/passport-jwt.guard';

@Controller('schema')
export class SchemaController {
    constructor(private readonly schemaService: SchemaService) {}

    @Get(':schemaName')
    @UseGuards(PassportJwtAuthGuard)
    getSchemaMetadata(@Param('schemaName') schemaName: string) {
        return this.schemaService.getSchemaMetadata(schemaName);
    }
}

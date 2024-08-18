import { Controller, Get } from '@nestjs/common';
import { TeacherSchemaService } from './teacher.schema.service';

@Controller('schema')
export class TeacherSchemaController {
  constructor(private readonly schemaService: TeacherSchemaService) {}

  @Get('teacher')
  getTeacherSchemaMetadata() {
    return this.schemaService.getSchemaMetadata();
  }
}

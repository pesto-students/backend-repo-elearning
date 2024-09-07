import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ClassService } from "./class.service";
import { ClassDto } from "./dto/class.dto";
import { GetClassQueryDto } from "./dto/get-class-query.dto";
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PassportJwtAuthGuard } from "src/auth/guards/passport-jwt.guard";

@ApiTags('Class')
@UseGuards(PassportJwtAuthGuard)
@Controller('class')
export class ClassController {
    constructor(private classService: ClassService) { }

    @ApiOperation({ summary: 'Create class' })
    @ApiResponse({ status: 201, description: 'Class created successfully' })
    @Post('create')
    async createClass(@Body() classDto: ClassDto) {
        return await this.classService.create(classDto);
    }

    @ApiOperation({ summary: 'Fetch classes' })
    @ApiResponse({ status: 200, description: 'Classes retrieved successfully' })
    @Post('fetch')
    async fetchClass(@Body() condition: GetClassQueryDto) {
        return await this.classService.fetchClass(condition);
    }
}
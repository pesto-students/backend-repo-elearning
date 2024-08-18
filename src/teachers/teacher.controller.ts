import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Controller('teachers')
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) { }

    @Post('create')
    async create(@Body() createTeacherDto: CreateTeacherDto) {
        console.log('create teacher dto', createTeacherDto);
        return this.teacherService.create(createTeacherDto);
    }

    // @Get()
    // async findAll() {
    //     return this.teacherService.findAll();
    // }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.teacherService.findOne(id);
    }

    // @Put(':id')
    // async update(@Param('id') id: string, @Body() updateTeacherDto: CreateTeacherDto) {
    //     return this.teacherService.update(id, updateTeacherDto);
    // }

    // @Delete(':id')
    // async remove(@Param('id') id: string) {
    //     return this.teacherService.remove(id);
    // }
}

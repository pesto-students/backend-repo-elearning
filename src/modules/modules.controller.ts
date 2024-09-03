import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { Modules } from 'src/core/schemas/modules/modules.schema';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  async create(@Body() createModuleDto: CreateModuleDto): Promise<Modules> {
    return await this.modulesService.create(createModuleDto);
  }

  @Get()
  async findAll(): Promise<Modules[]> {
    return this.modulesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Modules> {
    return this.modulesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateModuleDto: UpdateModuleDto,
  ): Promise<Modules> {
    return this.modulesService.update(id, updateModuleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.modulesService.remove(id);
  }
}

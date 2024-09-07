import { Injectable } from '@nestjs/common';
import { ModulesRepository } from './repository/modules.repository';
import { Modules } from 'src/core/schemas/modules/modules.schema';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Injectable()
export class ModulesService {
  constructor(private readonly modulesRepository: ModulesRepository) {}

  async create(createModuleDto: CreateModuleDto): Promise<Modules> {
    return this.modulesRepository.create(createModuleDto);
  }

  async findAll(): Promise<Modules[]> {
    return this.modulesRepository.findAll();
  }

  async findOne(id: string): Promise<Modules> {
    return this.modulesRepository.findOne(id);
  }

  async update(id: string, updateModuleDto: UpdateModuleDto): Promise<Modules> {
    return this.modulesRepository.update(id, updateModuleDto);
  }

  async remove(id: string): Promise<void> {
    return this.modulesRepository.remove(id);
  }
}

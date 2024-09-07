import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Modules } from 'src/core/schemas/modules/modules.schema';
import { CreateModuleDto } from '../dto/create-module.dto';
import { UpdateModuleDto } from '../dto/update-module.dto';

@Injectable()
export class ModulesRepository {
  constructor(
    @InjectModel(Modules.name) private readonly modulesModel: Model<Modules>,
  ) {}

  async create(createModuleDto: CreateModuleDto): Promise<Modules> {
    const createdModule = await new this.modulesModel(createModuleDto);
    return createdModule.save();
  }

  async findAll(): Promise<Modules[]> {
    return this.modulesModel.find().exec();
  }

  async findOne(id: string): Promise<Modules> {
    const module = await this.modulesModel.findById(id).exec();
    if (!module) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }
    return module;
  }

  async update(id: string, updateModuleDto: UpdateModuleDto): Promise<Modules> {
    const updatedModule = await this.modulesModel.findByIdAndUpdate(
      id,
      updateModuleDto,
      { new: true },
    ).exec();
    if (!updatedModule) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }
    return updatedModule;
  }

  async remove(id: string): Promise<void> {
    const result = await this.modulesModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }
  }
}

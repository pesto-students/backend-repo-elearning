import { Injectable, NotFoundException } from '@nestjs/common';

import { ParentsRepository } from './repository/parents.repository';
import { ApiResponseDto } from 'src/core/dto/api-response.dto';
import { Types } from 'mongoose';
import { ParentDto } from './dto/parents.dto';

@Injectable()
export class ParentsService {
  constructor(
    private parentsRepository: ParentsRepository,
  ) { }

  async createParent(parentDto: ParentDto): Promise<ApiResponseDto> {
    const res: string = await this.parentsRepository.create(parentDto);

    if (Types.ObjectId.isValid(res)) {
      const parentData = await this.fetchParent({ _id: new Types.ObjectId(res) });
      return new ApiResponseDto(true, 'Parent created successfully', parentData);
    }
    return new ApiResponseDto(false, 'Parent not created, please try again.');
  }

  async fetchParent(condition) {
    return await this.parentsRepository.fetchParentWithDetails(condition);
  }

  async updateParent(id: string, parentDto: ParentDto) {
    const updatedParent = await this.parentsRepository.update(id, parentDto);
    if (!updatedParent) {
      throw new NotFoundException(`Parent with ID "${id}" not found`);
    }
    return updatedParent;
  }

  // async removeParent(id: string) {
  //   const deletedParent = await this.parentsRepository.remove(id);
  //   if (!deletedParent) {
  //     throw new NotFoundException(`Parent with ID "${id}" not found`);
  //   }
  //   return deletedParent;
  // }
}

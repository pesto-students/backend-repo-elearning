import { Injectable } from '@nestjs/common';
import { BranchRepository } from './repository/branch-repository';
import { BranchDto } from './dto/branch.dto';
import { GetBranchQueryDto } from './dto/get-branch-query.dto';
import { Branch } from 'src/core/schemas/branch.schema';

@Injectable()
export class BranchService {
    constructor(private branchRepository: BranchRepository){}

    async createBranch(branchDto: BranchDto){
        return await this.branchRepository.create(branchDto);
    }

    async fetchBranch(condition: GetBranchQueryDto): Promise<Branch[]>{
        return await this.branchRepository.fetchBranchWithDetails(condition);
    }
}

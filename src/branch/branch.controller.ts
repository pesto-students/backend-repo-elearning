import { Body, Controller, Post } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchDto } from './dto/branch.dto';
import { GetBranchQueryDto } from './dto/get-branch-query.dto';

@Controller('branch')
export class BranchController {
    constructor(private branchService: BranchService){}

    @Post('create')
    async createBranch(@Body() branchDto: BranchDto){
        return await this.branchService.createBranch(branchDto);
    }

    @Post('fetch')
    async fetchBranch(@Body() condition: GetBranchQueryDto){
        return await this.branchService.fetchBranch(condition);
    }
}

import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { PassportJwtAuthGuard } from 'src/auth/guards/passport-jwt.guard';

@Controller('dashboard')
@UseGuards(PassportJwtAuthGuard)
export class DashboardController {
    constructor(
        private readonly dashboardService: DashboardService
    ){}
    
    @Post('counts')
    async getDashboardCounts(@Request() request) {
      return await this.dashboardService.getDashboardCounts(request);
    }

}

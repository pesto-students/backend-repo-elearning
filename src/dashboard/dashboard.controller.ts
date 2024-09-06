import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { PassportJwtAuthGuard } from 'src/auth/guards/passport-jwt.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DashboardCountsDto } from './dto/dashboard-count.dto';

@ApiTags('Dashboard')
@ApiBearerAuth()
@Controller('dashboard')
@UseGuards(PassportJwtAuthGuard)
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService
  ) { }

  @Post('counts')
  @ApiOperation({ summary: 'Get dashboard counts' })
  @ApiResponse({ status: 200, description: 'Returns the counts for various entities', type: DashboardCountsDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getDashboardCounts(@Body() body: any): Promise<DashboardCountsDto> {
    return await this.dashboardService.getDashboardCounts(body);
  }
}

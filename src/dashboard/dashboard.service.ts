import { Injectable } from '@nestjs/common';
import { DashboardRepository } from './repository/dashboard.repository';
import { UserTypeEnum } from 'src/core/enums/user-type.enum';

@Injectable()
export class DashboardService {
    constructor(
        private readonly dashboardRepository: DashboardRepository
    ) { }

    async getDashboardCounts(request: any) {
        let condition = {};
        if (request.userSession) {
            const commonCondition = {
                branchId: request.userSession.branchId,
            };

            if (request.userSession.userType !== UserTypeEnum.SUPER_ADMIN) {
                condition = { ...commonCondition };
            }
        }

        return this.dashboardRepository.getDashboardCounts(condition);
    }
}

import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { ModuleManagementService } from 'src/module-management/module-management.service';

@Injectable()
export class ModuleAccessGuard implements CanActivate {
  constructor(private readonly moduleManagementService: ModuleManagementService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const organizationId = request.userSession.organizationId;
    const moduleId = request.params.moduleId;
    const branchId = request.userSession.branchId;

    const isEnabled: boolean = await this.moduleManagementService.isModuleEnabled(organizationId, moduleId, branchId);
    if (!isEnabled) {
      throw new ForbiddenException('Module is not enabled for this organization');
    }
    return true;
  }
}

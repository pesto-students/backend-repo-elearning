import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserService } from "src/users/users.service";

@Injectable()
export class RequestInterceptor implements NestInterceptor {

    constructor(
        private readonly userService: UserService
    ) { }

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        
        if (request.user) {
            try {
                const userDetails = await this.userService.findUserByEmail(request.user.username);
                if (!userDetails) {
                    throw new UnauthorizedException('User not found');
                }

                request.userSession = {
                    userId: userDetails.id,
                    username: userDetails.username,
                    userType: userDetails.userType,
                    branchId: userDetails.branchId,
                    organizationId: userDetails.organizationId,
                    authId: userDetails._id,
                };
            } catch (error) {
                throw new UnauthorizedException('Error fetching user details');
            }
        }

        return next.handle();

    }

}
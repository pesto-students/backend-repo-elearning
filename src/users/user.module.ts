import { Module } from "@nestjs/common";
import { UserService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserType, userTypeSchema } from "src/core/schemas/user-type.schema";
import { UserController } from "./users.controller";
import { UserRepository } from "./repository/user.repository";
import { EmailModule } from "src/mail/email.module";
import { Auth, AuthSchema } from "src/core/schemas/auth.schema";
import { RequestInterceptor } from "src/core/interceptor/req.interceptor";
import { ModuleManagementModule } from "src/module-management/module-management.module";
import { ModuleManagementService } from "src/module-management/module-management.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: UserType.name,
                schema: userTypeSchema
            },
            {
                name: Auth.name,
                schema: AuthSchema
            }
        ]),
        EmailModule,
    ],
    controllers:[UserController],
    providers: [UserService, UserRepository, RequestInterceptor],
    exports: [UserService]
})

export class UserModule{}
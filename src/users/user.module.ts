import { Module } from "@nestjs/common";
import { UserService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserType, userTypeSchema } from "src/core/schemas/user-type.schema";
import { UserController } from "./users.controller";
import { UserRepository } from "./repository/user.repository";
import { EmailModule } from "src/mail/email.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: UserType.name,
                schema: userTypeSchema
            }
        ]),
        EmailModule
    ],
    controllers:[UserController],
    providers: [UserService, UserRepository],
    exports: [UserService]
})

export class UserModule{}
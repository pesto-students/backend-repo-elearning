import { Module } from "@nestjs/common";
import { UserService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserType, userTypeSchema } from "src/core/schemas/user-type.schema";
import { UserController } from "./users.controller";
import { UserRepository } from "./repository/user.repository";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: UserType.name,
                schema: userTypeSchema
            }
        ])
    ],
    controllers:[UserController],
    providers: [UserService, UserRepository],
    exports: [UserService]
})

export class UserModule{}
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OnlineClassController } from "./online-class.controller";
import { OnlineClassService } from "./online-class.service";
import { OnlineClassRepository } from "./repository/online-class.respository";
import { OnlineClass, OnlineClassSchema } from "src/core/schemas/online-class.schema";
import { Branch, BranchSchema } from "src/core/schemas/branch.schema";

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name: OnlineClass.name,
                schema: OnlineClassSchema
            },
            {
                name: Branch.name,
                schema: BranchSchema
            },
        ])
    ],
    providers:[OnlineClassService, OnlineClassRepository],
    controllers:[OnlineClassController]
})
export class OnlineClassModule{}
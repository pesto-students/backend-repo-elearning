import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Class, ClassSchema } from "src/core/schemas/class.schema";
import { ClassService } from "./class.service";
import { ClassRepository } from "./repository/class.repository";
import { ClassController } from "./class.controller";

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name: Class.name,
                schema: ClassSchema
            }
        ])
    ],
    providers: [ClassService, ClassRepository],
    controllers: [ClassController],
    exports:[ClassService]
})
export class ClassModule{}
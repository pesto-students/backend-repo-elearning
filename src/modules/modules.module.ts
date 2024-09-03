import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Modules, ModulesSchema } from 'src/core/schemas/modules/modules.schema';
import { ModulesController } from './modules.controller';
import { ModulesService } from './modules.service';
import { ModulesRepository } from './repository/modules.repository';

@Module({
    imports:[
        MongooseModule.forFeature([{ name: Modules.name, schema: ModulesSchema }]),
    ],
    controllers:[ModulesController],
    providers:[ModulesService, ModulesRepository],
    exports:[ModulesService]
})
export class ModulesModule {}

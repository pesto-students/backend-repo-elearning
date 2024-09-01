import { Module } from '@nestjs/common';
import { ParentsService } from './parents.service';
import { ParentsController } from './parents.controller';
import { ParentsRepository } from './repository/parents.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Parent, ParentSchema } from 'src/core/schemas/parent.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Parent.name, schema: ParentSchema }])],
  controllers: [ParentsController],
  providers: [ParentsService, ParentsRepository],
})
export class ParentsModule { }
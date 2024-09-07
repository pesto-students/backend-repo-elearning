import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Parent, ParentSchema } from 'src/core/schemas/parent.schema';
import { UserModule } from 'src/users/user.module';
import { ParentsController } from './parents.controller';
import { ParentsService } from './parents.service';
import { ParentsRepository } from './repository/parents.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Parent.name, schema: ParentSchema }]), AuthModule, UserModule],
  controllers: [ParentsController,],
  providers: [ParentsService, ParentsRepository],
})
export class ParentsModule { }
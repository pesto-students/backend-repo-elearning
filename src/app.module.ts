import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { mongoDbProvider } from './core/providers/mongo/database.provider';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { OrganizationModule } from './organization/organization.module';
import { LocationModule } from './location/location.module';
import { BranchModule } from './branch/branch.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ...mongoDbProvider,
    AuthModule,
    OrganizationModule,
    LocationModule,
    BranchModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { mongoDbProvider } from './core/providers/mongo/database.provider';

@Module({
  imports: [
    ...mongoDbProvider
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

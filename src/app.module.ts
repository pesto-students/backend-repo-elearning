import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { mongoDbProvider } from './core/providers/mongo/database.provider';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { OrganizationModule } from './organization/organization.module';
import { LocationModule } from './location/location.module';
import { BranchModule } from './branch/branch.module';
import { TeacherModule } from './teachers/teacher.module';
import { ClassModule } from './classes/class.module';
import { OnlineClassModule } from './online-class/online-class.module';
import { StudentModule } from './students/student.module';
import { SchemaService } from './schema/schema.service';
import { SchemaController } from './schema/schema.controller';
import { SchemaModule } from './schema/schema.module';
import { GeminiModule } from './gemini/gemini.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AiChatModule } from './ai-chat/ai-chat.module';
import { ParentsModule } from './parents/parents.module';
import { ModulesModule } from './modules/modules.module';
import { ModuleManagementModule } from './module-management/module-management.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        connectionFactory: (connection) => {
          connection.on('connected', () => {
            console.log('MongoDB connected successfully');
          });
          connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
          });
          connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
          });
          return connection;
        },
      }),
    }),
    ...mongoDbProvider,
    AuthModule,
    OrganizationModule,
    LocationModule,
    BranchModule,
    TeacherModule,
    ClassModule,
    OnlineClassModule,
    StudentModule,
    SchemaModule,
    GeminiModule,
    DashboardModule,
    AiChatModule,
    ParentsModule,
    ModulesModule,
    ModuleManagementModule
  ],
  controllers: [AppController, SchemaController],
  providers: [AppService, SchemaService],
})
export class AppModule { }

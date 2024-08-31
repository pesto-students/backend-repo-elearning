import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TeacherModule } from 'src/teachers/teacher.module';
import { StudentModule } from 'src/students/student.module';
import { OnlineClassModule } from 'src/online-class/online-class.module';
import { ClassModule } from 'src/classes/class.module';
import { BranchModule } from 'src/branch/branch.module';

@Module({
  imports:[
    TeacherModule,
    StudentModule,
    OnlineClassModule,
    ClassModule,
    BranchModule
  ],
  providers: [DashboardService],
  controllers: [DashboardController]
})
export class DashboardModule {}

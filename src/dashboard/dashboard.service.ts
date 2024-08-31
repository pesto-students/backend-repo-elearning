import { Injectable } from '@nestjs/common';
import { BranchService } from 'src/branch/branch.service';
import { ClassService } from 'src/classes/class.service';
import { UserTypeEnum } from 'src/core/enums/user-type.enum';
import { OnlineClassService } from 'src/online-class/online-class.service';
import { StudentService } from 'src/students/student.service';
import { TeacherService } from 'src/teachers/teacher.service';

@Injectable()
export class DashboardService {

    constructor(
        private readonly teacherService: TeacherService,
        private readonly studentService: StudentService,
        private readonly branchService: BranchService,
        private readonly classService: ClassService,
        private readonly onlineClassesService: OnlineClassService,
    ){}

    async getDashboardCounts(request) {
        let condition;
        if(request.userSession){
            const commonCondition = {
                branchId: request.userSession.branchId,
            }

            
            // organizationId: request.userSession.organizationId,

            if(request.userSession.userType === UserTypeEnum.ORG_ADMIN){
                condition = {
                    ...commonCondition
                }
            }

            if(request.userSession.userType === UserTypeEnum.BRANCH_ADMIN){
                condition = {
                    ...commonCondition
                }
            }

            if(request.userSession.userType === UserTypeEnum.STUDENT){
                condition = {
                    ...commonCondition
                }
            }

            if(request.userSession.userType === UserTypeEnum.TEACHER){
                condition = {
                    ...commonCondition
                }
            }

            if(request.userSession.userType === UserTypeEnum.SUPER_ADMIN){}
        }
        // const [teacherCount, studentCount] = await Promise.all([
        //   this.teacherService.count(condition),
        //   this.studentService.count(condition),
          // Fetch other counts in parallel
        // ]);
      
        // return {
        //   teacherCount,
        //   studentCount,
        //   // Other counts
        // };
      }

}

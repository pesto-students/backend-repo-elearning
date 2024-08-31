import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentDto } from './dto/student.dto';
import { DbQueryConditionDto } from './dto/db-query-condition.dto';
import { StudentRepository } from './repository/student.repository';
import { AuthUtils } from 'src/core/utils/auth.utils';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/users/users.service';

@Injectable()
export class StudentService {
    constructor(
        private studentRepository: StudentRepository,
        private readonly authService: AuthService,
        private userService: UserService,
    ) { }

    async CreateStudent(studentDto: StudentDto, request): Promise<any>{
        const password: string = AuthUtils.generateSecurePassword(8);
        const hasPassword: string = await AuthUtils.createPasswordHash(password);
        studentDto = {
            ...studentDto,
            branchId: request.userSession.branchId,
            organizationId: request.userSession.organizationId,
            password: hasPassword
        }
        const res: boolean =  await this.studentRepository.create(studentDto);

        if(res){
            const mailObj =  {
                name: studentDto.firstName+' '+studentDto?.lastName, 
                email: studentDto.email
            }
            const verificationLink: string = await this.authService.createVerificationLink(
               mailObj
            );
            await this.userService.sendWelcomeEmail({...mailObj, password: password, username: studentDto.email});
            await this.userService.sendVerificationMail(
                {
                    ...mailObj,
                    verificationLink,
                    currentYear:  new Date().getFullYear()
                });
            
            return true;
        }
        return false;
    }

    async fetchStudent(condition: DbQueryConditionDto) {
        return await this.studentRepository.fetchStudentWithDetails(condition);
    }

    // async updateStudent(id: string, studentDto: StudentDto) {
    //     const updatedStudent = await this.studentRepository.update(id, studentDto);
    //     if (!updatedStudent) {
    //         throw new NotFoundException(`Student with ID "${id}" not found`);
    //     }
    //     return updatedStudent;
    // }
}
import { Injectable } from "@nestjs/common";
import { CreateTeacherDto, GetTeacherQueryDto, UpdateTeacherDto } from "./dto/teacher.dto";
import { TeacherRepository } from "./repository/teacher.repository";
import { Teacher } from "src/core/schemas/teacher.schema";
import { AuthUtils } from "src/core/utils/auth.utils";
import { AuthService } from "src/auth/auth.service";
import { UserService } from "src/users/users.service";

@Injectable()
export class TeacherService {
    constructor(
        private teacherRepository: TeacherRepository,
        private readonly authService: AuthService,
        private userService: UserService,
    ) { }

    async CreateTeacher(teacherDto: CreateTeacherDto, request): Promise<any>{
        const password: string = AuthUtils.generateSecurePassword(8);
        const hasPassword: string = await AuthUtils.createPasswordHash(password);
        
        teacherDto = {
            ...teacherDto,
            branchId: request.userSession.branchId,
            organizationId: request.userSession.organizationId,
            password: hasPassword
        }

        const res: boolean = await this.teacherRepository.create(teacherDto);

        if(res){
            const mailObj =  {
                name: teacherDto.firstName+' '+teacherDto?.lastName, 
                email: teacherDto.email
            }
            const verificationLink: string = await this.authService.createVerificationLink(
               mailObj
            );
            await this.userService.sendWelcomeEmail({...mailObj, password: password, username: teacherDto.email});
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

    async fetchTeacher(condition: GetTeacherQueryDto): Promise<Teacher[]> {
        return await this.teacherRepository.fetchTeacherWithDetails(condition);
    }

    async updateTeacher(updateTeacherDto: UpdateTeacherDto): Promise<Teacher> {
        return await this.teacherRepository.update(updateTeacherDto);
    }
} 

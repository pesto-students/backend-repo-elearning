import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTeacherDto, GetTeacherQueryDto, UpdateTeacherDto, UpdateTeacherEnrollmentsDto, FetchTeacherClassesDto } from "./dto/teacher.dto";
import { TeacherRepository } from "./repository/teacher.repository";
import { Teacher } from "src/core/schemas/teacher.schema";
import { AuthUtils } from "src/core/utils/auth.utils";
import { AuthService } from "src/auth/auth.service";
import { UserService } from "src/users/users.service";
import { Types } from "mongoose";
import { ApiResponseDto } from "src/core/dto/api-response.dto";
import { IsUserExistDto } from "src/users/dto/user.dto";
import { UserTypeEnum } from "src/core/enums/user-type.enum";

@Injectable()
export class TeacherService {
    constructor(
        private teacherRepository: TeacherRepository,
        private readonly authService: AuthService,
        private userService: UserService,
    ) { }

    async CreateTeacher(teacherDto: CreateTeacherDto, request): Promise<ApiResponseDto> {

        const userExistData: IsUserExistDto = {
            username: teacherDto.email,
            userType: UserTypeEnum.STUDENT,
            branchId: request.userSession.branchId,
            organizationId: request.userSession.organizationId,
        };

        const isUserExist: boolean = await this.userService.isUserExist(userExistData);
        if (isUserExist) {
            return new ApiResponseDto(false, 'Teacher already exist');
        }

        const password: string = AuthUtils.generateSecurePassword(8);
        const hasPassword: string = await AuthUtils.createPasswordHash(password);

        teacherDto = {
            ...teacherDto,
            branchId: request.userSession.branchId,
            organizationId: request.userSession.organizationId,
            password: hasPassword
        }

        const res: string = await this.teacherRepository.create(teacherDto);

        if (Types.ObjectId.isValid(res)) {
            const mailObj = {
                name: teacherDto.firstName + ' ' + teacherDto?.lastName,
                email: teacherDto.email
            }
            const verificationLink: string = await this.authService.createVerificationLink(
                mailObj
            );
            try {
                await this.userService.sendWelcomeEmail({ ...mailObj, password: password, username: teacherDto.email });
                await this.userService.sendVerificationMail(
                    {
                        ...mailObj,
                        verificationLink,
                        currentYear: new Date().getFullYear()
                    });
            } catch (error) {
                console.log("error occured during sending mail");
            }

            const teacher = await this.fetchTeacher({ _id: new Types.ObjectId(res) });
            return new ApiResponseDto(true, 'Teacher created succesfully', teacher);
        }

        return new ApiResponseDto(false, 'Teacher not created, please try again.');
    }

    async fetchTeacher(condition: GetTeacherQueryDto): Promise<Teacher[]> {
        return await this.teacherRepository.fetchTeacherWithDetails(condition);
    }

    async updateTeacher(updateTeacherDto: UpdateTeacherDto): Promise<Teacher> {
        return await this.teacherRepository.update(updateTeacherDto);
    }

    async updateTeacherEnrollments(updateEnrollmentsDto: UpdateTeacherEnrollmentsDto): Promise<ApiResponseDto> {
        try {
            await this.teacherRepository.updateEnrollments(
                updateEnrollmentsDto.teacherIds,
                updateEnrollmentsDto.classIds
            );
            return new ApiResponseDto(true, 'Teacher enrollments updated successfully');
        } catch (error) {
            console.error('Error updating teacher enrollments:', error);
            if (error instanceof NotFoundException) {
                return new ApiResponseDto(false, error.message);
            }
            return new ApiResponseDto(false, 'Failed to update teacher enrollments');
        }
    }

    async fetchTeacherClasses(teacherId: Types.ObjectId): Promise<ApiResponseDto> {
        try {
            const classes = await this.teacherRepository.fetchTeacherClasses(teacherId);
            return new ApiResponseDto(true, 'Classes fetched successfully', classes);
        } catch (error) {
            console.error('Error fetching teacher classes:', error);
            return new ApiResponseDto(false, 'Failed to fetch teacher classes');
        }
    }

    async deleteTeachers(teacherIds: Types.ObjectId[]): Promise<ApiResponseDto> {
        try {
            const result = await this.teacherRepository.deleteTeachers(teacherIds);
            return new ApiResponseDto(true, 'Teachers deleted successfully', result);
        } catch (error) {
            console.error('Error deleting teachers:', error);
            return new ApiResponseDto(false, 'Failed to delete teachers');
        }
    }
}

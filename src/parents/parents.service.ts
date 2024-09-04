import { Injectable, NotFoundException } from '@nestjs/common';

import { ParentsRepository } from './repository/parents.repository';
import { ApiResponseDto } from 'src/core/dto/api-response.dto';
import { Types } from 'mongoose';
import { ParentDto } from './dto/parents.dto';
import { AuthUtils } from 'src/core/utils/auth.utils';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/users/users.service';
import { IsUserExistDto } from 'src/users/dto/user.dto';
import { UserTypeEnum } from 'src/core/enums/user-type.enum';

@Injectable()
export class ParentsService {
  constructor(
    private parentsRepository: ParentsRepository,
    private readonly authService: AuthService,
    private userService: UserService,
  ) { }

  async createParent(parentDto: ParentDto, request): Promise<ApiResponseDto> {
    // const userExistData: IsUserExistDto = {
    //   username: parentDto.email,
    //   userType: UserTypeEnum.PARENT,
    //   branchId: request.userSession.branchId,
    //   organizationId: request.userSession.organizationId,
    // };

    // const isUserExist: boolean = await this.userService.isUserExist(userExistData);
    // if (isUserExist) {
    //   return new ApiResponseDto(false, 'Parent already exists');
    // }

    // const password: string = AuthUtils.generateSecurePassword(8);
    // const hashedPassword: string = await AuthUtils.createPasswordHash(password);

    // parentDto = {
    //   ...parentDto,
    //   branchId: request.userSession.branchId,
    //   organizationId: request.userSession.organizationId,
    //   password: hashedPassword
    // };

    const res: string = await this.parentsRepository.create(parentDto);

    if (Types.ObjectId.isValid(res)) {
      const mailObj = {
        name: parentDto.fatherName + ' ' + parentDto?.motherName,
        email: parentDto.email
      };
      const verificationLink: string = await this.authService.createVerificationLink(mailObj);
      try {
        await this.userService.sendWelcomeEmail({ ...mailObj, password: password, username: parentDto.email });
        await this.userService.sendVerificationMail({
          ...mailObj,
          verificationLink,
          currentYear: new Date().getFullYear()
        });
      } catch (error) {
        console.log("Error occurred during sending mail");
      }

      const parentData = await this.fetchParent({ _id: new Types.ObjectId(res) });
      return new ApiResponseDto(true, 'Parent created successfully', parentData);
    }
    return new ApiResponseDto(false, 'Parent not created, please try again.');
  }

  async fetchParent(condition) {
    return await this.parentsRepository.fetchParentWithDetails(condition);
  }

  async updateParent(id: string, parentDto: ParentDto) {
    const updatedParent = await this.parentsRepository.update(id, parentDto);
    if (!updatedParent) {
      throw new NotFoundException(`Parent with ID "${id}" not found`);
    }
    return updatedParent;
  }

  // async removeParent(id: string) {
  //   const deletedParent = await this.parentsRepository.remove(id);
  //   if (!deletedParent) {
  //     throw new NotFoundException(`Parent with ID "${id}" not found`);
  //   }
  //   return deletedParent;
  // }
}

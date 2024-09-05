import { Injectable } from "@nestjs/common";
import { UserRepository } from "./repository/user.repository";
import { EmailSubjectEnum } from "src/mail/enum/email-subject.enum";
import { EmailProvider } from "src/mail/enum/email-providers.enum";
import { EmailTemplateEnum } from "src/mail/enum/email-template.enum";
import { EmailService } from "src/mail/email.service";
import { Auth } from "src/core/schemas/auth.schema";
import { IsUserExistDto } from "./dto/user.dto";
import { UserTypeEnum } from "src/core/enums/user-type.enum";
export type User = any;

@Injectable()

export class UserService {

  constructor(private userRepository: UserRepository,
    private emailService: EmailService
  ) { }

  async createAuth(data, session) {
    return await this.userRepository.createAuth(data, session);
  }

  async findUserByEmail(username: string): Promise<Auth> {
    return await this.userRepository.findOne({ username });
  }

  async findUserById(id: string) {
    return this.userRepository.findOneById(id);
  }

  async createUserType(userTypeDto) {
    return this.userRepository.createUserType(userTypeDto);
  }

  async updateLastLoginAndToken(userId: string, token: string): Promise<any> {
    const updateData = {
      lastLogin: new Date(),
      token: token,
    };

    return this.userRepository.updateUser({ _id: userId }, updateData);
  }

  async sendVerificationMail(verificationData) {
    const to = verificationData?.email;
    const subject = EmailSubjectEnum.EMAIL_VERIFICATION;
    const templateName = EmailTemplateEnum.EMAIL_VERIFICATION;
    const context = verificationData;

    await this.emailService.sendEmail(
      EmailProvider.BREVO,
      to,
      subject,
      templateName,
      context
    );
  }

  async sendWelcomeEmail(userDetails) {
    const to = userDetails?.email;
    const subject = EmailSubjectEnum.WELCOME;
    const templateName = EmailTemplateEnum.ONBOARD_ORGANIZATION;
    const context = { name: userDetails.name, password: userDetails.password, username: userDetails.username };

    await this.emailService.sendEmail(
      EmailProvider.BREVO,
      to,
      subject,
      templateName,
      context
    );
  }

  async sendOnlineClassScheduleEmail(userDetails) {
    const to = userDetails?.email;
    const subject = EmailSubjectEnum.ONLINE_CLASS_SCHEDULE;
    const templateName = EmailTemplateEnum.ONLINE_CLASS_SCHEDULE;
    const context = { name: userDetails.name,  };

    await this.emailService.sendEmail(
      EmailProvider.BREVO,
      to,
      subject,
      templateName,
      context
    );
  }

  async isUserExist(userData: IsUserExistDto): Promise<boolean>{
    const res: Auth = await this.userRepository.findOne(userData);
    return res?._id ? true : false;
  }

}
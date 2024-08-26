import { Injectable } from "@nestjs/common";
import { UserRepository } from "./repository/user.repository";
import { EmailSubjectEnum } from "src/mail/enum/email-subject.enum";
import { EmailProvider } from "src/mail/enum/email-providers.enum";
import { EmailTemplateEnum } from "src/mail/enum/email-template.enum";
import { EmailService } from "src/mail/email.service";
import { Auth } from "src/core/schemas/auth.schema";
export type User = any;

@Injectable()

export class UserService {

    constructor(private userRepository: UserRepository,
      private emailService: EmailService
    ){}

    private readonly users = [
        {
          userId: 1,
          username: 'john',
          password: 'changeme',
        },
        {
          userId: 2,
          username: 'maria',
          password: 'guess',
        },
      ];
    
      async findUserByEmail(username: string): Promise<Auth> {
        return await this.userRepository.findOne({ username });
      }
    
      async findUserById(id: string) {
        return this.userRepository.findOneById(id);
      }

      async createUserType(userTypeDto){
        return this.userRepository.createUserType(userTypeDto);
      }

      async updateLastLoginAndToken(userId: string, token: string): Promise<any> {
        const updateData = {
          lastLogin: new Date(),
          token: token,
        };
    
        return this.userRepository.updateUser({ _id: userId }, updateData);
      }

      async sendVerificationMail(verificationData){
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
        const context = { username: userDetails.name };
    
        await this.emailService.sendEmail(
          EmailProvider.BREVO,
          to,
          subject,
          templateName,
          context
        );
    }

}
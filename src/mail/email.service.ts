import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { EmailServiceInterface } from './email.service.interface';
import { BrevoEmailService } from './brevo-email.service';
import { EmailProvider } from './enum/email-providers.enum';

@Injectable()
export class EmailService {
  private readonly emailServices: Record<EmailProvider, EmailServiceInterface>;

  constructor(
    @Inject(EmailProvider.BREVO) private readonly brevoEmailService: BrevoEmailService,
    // Add other services if needed
  ) {
    this.emailServices = {
      [EmailProvider.BREVO]: this.brevoEmailService,
      // Add other providers if needed
    };
  }

  async sendEmail(
    provider: EmailProvider,
    to: string,
    subject: string,
    templateName: string,
    context: any
  ) {
    const emailService = this.emailServices[provider];
    if (!emailService) {
      throw new NotFoundException(`Email provider ${provider} not found`);
    }
    return emailService.sendEmail(to, subject, templateName, context);
  }
}

import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { EmailServiceInterface } from './email.service.interface';
import { BrevoEmailService } from './brevo-email.service';
import { EmailProvider } from './enum/email-providers.enum';
import { HttpStatusCode } from 'axios';
import { HandlebarsService } from './handlebars.service';

@Injectable()
export class EmailService {
  private readonly emailServices: Record<EmailProvider, EmailServiceInterface>;

  constructor(
    @Inject(EmailProvider.BREVO) private readonly brevoEmailService: BrevoEmailService,
    private readonly handlebarsService: HandlebarsService
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
  ): Promise<boolean> {
    const emailService = this.emailServices[provider];
    if (!emailService) {
      throw new NotFoundException(`Email provider ${provider} not found`);
    }
    const htmlContent: string = await this.handlebarsService.renderTemplate(templateName, context);

    const mailSend = await emailService.sendEmail(to, subject, htmlContent);
    return mailSend === HttpStatusCode.Created ? true : false;
  }
}

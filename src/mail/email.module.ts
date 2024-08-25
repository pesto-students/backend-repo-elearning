import { Module } from '@nestjs/common';
import { BrevoEmailService } from './brevo-email.service';
import { EmailService } from './email.service';
import { EmailProvider } from './enum/email-providers.enum';
import { HandlebarsService } from './handlebars.service';
 
@Module({
  providers: [
    BrevoEmailService,
    EmailService,
    {
      provide: EmailProvider.BREVO,
      useClass: BrevoEmailService,
    },
    HandlebarsService
  ],
  exports: [EmailService],
})
export class EmailModule {}

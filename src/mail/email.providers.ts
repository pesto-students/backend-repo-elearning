import { BrevoEmailService } from './brevo-email.service';
import { EmailProvider } from './enum/email-providers.enum';

export const emailProviders = {
  [EmailProvider.BREVO]: {
    provide: EmailProvider.BREVO,
    useClass: BrevoEmailService,
  },
  // Add more providers if needed
};

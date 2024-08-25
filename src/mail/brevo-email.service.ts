import { Injectable } from '@nestjs/common';
import * as brevo from '@getbrevo/brevo';
import { TransactionalEmailsApi, SendSmtpEmail } from '@getbrevo/brevo';
import { HandlebarsService } from './handlebars.service';


@Injectable()
export class BrevoEmailService {
    private readonly apiInstance: TransactionalEmailsApi;

    constructor(private readonly handlebarsService: HandlebarsService) {
      this.apiInstance = new TransactionalEmailsApi();
      this.apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_EMAIL_API_KEY); // Replace with your actual API key
    }

    async sendEmail(
        to: string,
        subject: string,
        templateName: string,
        context: any
      ) {
        const htmlContent = await this.handlebarsService.renderTemplate(templateName, context);
    
        const sendSmtpEmail = new SendSmtpEmail();
        sendSmtpEmail.subject = subject;
        sendSmtpEmail.htmlContent = htmlContent;
        sendSmtpEmail.sender = { name: process.env.BREVO_SENDER_NAME, email: process.env.BREVO_SENDER_EMAIL };
        sendSmtpEmail.to = [{ email: to }];
        // sendSmtpEmail.replyTo = { email: replyToEmail };
        sendSmtpEmail.headers = { 'Some-Custom-Name': 'unique-id-1234' };
    
        try {
          const response = await this.apiInstance.sendTransacEmail(sendSmtpEmail);
          console.log('Email sent successfully:', response);
          return response;
        } catch (error) {
          console.error('Error sending email:', error);
          throw error;
        }
      }
}

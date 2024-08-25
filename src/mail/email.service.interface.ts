export interface EmailServiceInterface {
    sendEmail(
      to: string,
      subject: string,
      templateName: string,
      context: string
    ): Promise<any>;
  }
  
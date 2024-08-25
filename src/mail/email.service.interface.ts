export interface EmailServiceInterface {
    sendEmail(
      to: string,
      subject: string,
      htmlContent: string,
    ): Promise<any>;
  }
  
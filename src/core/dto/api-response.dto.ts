export class ApiResponseDto {
    status: boolean;
    message: string;
    data?: Record<string, any>;
  
    constructor(status: boolean, message: string, data?: Record<string, any>) {
      this.status = status;
      this.message = message;
      this.data = data;
    }
}
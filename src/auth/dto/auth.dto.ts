export class AuthInputDto{
    username: string;
    password: string;
}

export class SignInDataDto{
    userId: string; 
    username: string;
}

export class AuthResultDto{
    accessToken: string;
    userId: string;
    username: string;
}
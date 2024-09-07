import { UserTypeEnum } from "src/core/enums/user-type.enum";

export class AuthInputDto{
    username: string;
    password: string;
}

export class SignInDataDto{
    userId: string; 
    username: string;
    userType: UserTypeEnum;
    name: string;
    isVerified: Boolean;
}

export class AuthResultDto{
    accessToken: string;
    userId: string;
    username: string;
    userType: UserTypeEnum;
    name: string;
    isVerified: Boolean;
}
import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/users/users.service";
import { LoginDto } from "./dtos/login.dto";
import { AuthUtils } from "src/core/utils/auth.utils";
import { Auth } from "src/core/schemas/auth.schema";

@Injectable()

export class AuthService{

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){} 

    async validateUser(username: string, password: string): Promise<any>{

        const user: Auth = await this.userService.findUserByEmail(username);

        if (!user) {
            throw new NotFoundException('Username not found, please try again');
        }

        const passwordMatched: boolean = await AuthUtils.matchHashPassword(user.password, password);

        if(passwordMatched){
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(userCred: LoginDto){
        const payload = { username: userCred.username, password: userCred.password };
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    async findUserById(userId: string) {
        return await this.userService.findUserById(userId);
    }

}
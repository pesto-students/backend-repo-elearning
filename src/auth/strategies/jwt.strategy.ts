import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt"; 
import { AuthService } from "../auth.service";
import { UserTypeEnum } from "src/core/enums/user-type.enum";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload) { 
        return {
            userId: payload.sub,
            username: payload.username,
            userType: UserTypeEnum[payload.userType],
            name: payload.name,
            isVerified: payload.isVerified,
        }
    }
}
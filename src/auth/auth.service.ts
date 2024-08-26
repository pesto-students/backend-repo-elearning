import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthUtils } from 'src/core/utils/auth.utils';
import { UserService } from 'src/users/users.service';
import { EcnryptedTokenDto } from './dto/verification-link.dto';
import { EncryptionUtils } from 'src/core/utils/encryption.utils';
import { DateUtils } from 'src/core/utils/date.utils';
import { AuthInputDto, AuthResultDto, SignInDataDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}


    async authenticate(input: AuthInputDto): Promise<AuthResultDto>{
        const user = await this.validateUser(input);
        if(!user){
            throw new UnauthorizedException();
        }

        return this.signIn(user);
    }

    async validateUser(input: AuthInputDto): Promise<SignInDataDto | null>{
        const user = await this.userService.findUserByEmail(input.username);
        if (!user) {
            throw new NotFoundException('Username not found, please try again');
        }
        const passwordMatched: boolean = await AuthUtils.matchHashPassword(user.password, input.password);

        if(user && passwordMatched){
            return {
                userId: user._id.toString(),
                username: user.username
            }
        }
        return null;
    }

    async createVerificationLink(tokenData: EcnryptedTokenDto): Promise<string>{
        const linkExpire = parseInt(process.env.VERIFICATION_TOKEN_EXPIRES)/60;
        const encryptedToken: string = await EncryptionUtils.encryptWithPublicKey(
            JSON.stringify(
            {
                ...tokenData,
                linkExpire: DateUtils.addTimeToDate(new Date(), {seconds: linkExpire})
            })
        );
        return `${process.env.FRONT_END_URL}/verify-email?token=${encryptedToken}`;
    }

    async signIn(user: SignInDataDto): Promise<AuthResultDto>{
        const tokenPayload = {
            sub: user.userId,
            username: user.username
        }

        const accessToken = await this.jwtService.signAsync(tokenPayload);

        return {
            accessToken,
            username: user.username,
            userId: user.userId
        };
    }
}

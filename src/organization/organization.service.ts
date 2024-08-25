import { Injectable } from "@nestjs/common";
import { CreateOrganizationDto, GetOrganizationQueryDto } from "./dto/create-organization.dto";
import { OrganizationRepository } from "./repository/organization.repository";
import { Organization } from "src/core/schemas/organization.schema";
import { EmailService } from "src/mail/email.service";
import { EmailProvider } from "src/mail/enum/email-providers.enum";
import { EmailSubjectEnum } from "src/mail/enum/email-subject.enum";
import { AuthUtils } from "src/core/utils/auth.utils";
import { EmailTemplateEnum } from "src/mail/enum/email-template.enum";
import { UserService } from "src/users/users.service";
import { EncryptionUtils } from "src/core/utils/encryption.utils";
import { randomBytes } from "node:crypto";
import { DateUtils } from "src/core/utils/date.utils";

@Injectable()
export class OrganizationService {

    constructor(private readonly organizationRepository: OrganizationRepository,
        private readonly userService: UserService
    ) { }

    async create(organizationData: CreateOrganizationDto) {
        const condition: GetOrganizationQueryDto = {
            organizationId: organizationData?.organizationId
        };
 
        const isOrgExist: number = await this.organizationRepository.countOrganizations(condition);
        if(isOrgExist){
            return "Organization already exist with Organization ID";
        }

        
        const hasPassword: string = await AuthUtils.createPasswordHash(organizationData?.password);
        organizationData.password = hasPassword;
        
        const res: boolean = await this.organizationRepository.create(organizationData);
        if(res){
            const linkExpire = parseInt(process.env.VERIFICATION_TOKEN_EXPIRES)/60;
            const encryptedToken: string = await EncryptionUtils.encryptWithPublicKey(JSON.stringify({name: organizationData.name, email: organizationData.email, linkExpire: DateUtils.addTimeToDate(new Date(), {seconds: linkExpire})}));
            const verificationLink = `${process.env.FRONT_END_URL}/verify-email?token=${encryptedToken}`;
            await this.userService.sendWelcomeEmail({name: organizationData.name, email: organizationData.email});
            await this.userService.sendVerificationMail(
                {
                    name: organizationData.name, 
                    email: organizationData.email, 
                    verificationLink,
                    currentYear:  new Date().getFullYear()
                });

        }
    }

    async organizationType(organizationType: string) {
        return await this.organizationRepository.createOrganizationType(organizationType);
    }

    async fetchOrganizationType(): Promise<any> {
        return await this.organizationRepository.fetchOrganizationType();
    }

    async fetchOrganization(condition: GetOrganizationQueryDto): Promise<Organization[]> {
        return await this.organizationRepository.fetchOrganizationWithDetails(condition);
    }

    

}
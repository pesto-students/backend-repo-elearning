import { Injectable } from "@nestjs/common";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { CreateOrganizationDto, GetOrganizationQueryDto } from "./dto/create-organization.dto";
import { OrganizationRepository } from "./repository/organization.repository";
import { Organization } from "src/core/schemas/organization.schema";
import { EmailService } from "src/mail/email.service";
import { EmailProvider } from "src/mail/enum/email-providers.enum";
import { EmailSubject } from "src/mail/enum/email-subject.enum";
import { AuthUtils } from "src/core/utils/auth.utils";
import { EmailTemplateEnum } from "src/mail/enum/email-template.enum";

@Injectable()
export class OrganizationService {

    constructor(private readonly organizationRepository: OrganizationRepository,
        private readonly emailService: EmailService
    ) { }

    async create(createOrganizationDto: CreateOrganizationDto) {
        const condition: GetOrganizationQueryDto = {
            organizationId: createOrganizationDto?.organizationId
        };
        const isOrgExist: number = await this.organizationRepository.countOrganizations(condition);
        if(isOrgExist){
            return "Organization already exist with Organization ID";
        }

        this.sendWelcomeEmail();
        const hasPassword: string = await AuthUtils.createPasswordHash(createOrganizationDto?.password);
        createOrganizationDto.password = hasPassword;
        return true;
        // return await this.organizationRepository.create(createOrganizationDto);
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

    async sendWelcomeEmail() {
        const to = 'rahultest@yopmail.com';
        const subject = 'Welcome to Our Platform!';
        const templateName = EmailTemplateEnum.ONBOARD_ORGANIZATION; // Template file name without extension
        const context = { name: 'John Doe' }; // Data to populate the template
    
        await this.emailService.sendEmail(
          EmailProvider.BREVO,
          to,
          subject,
          templateName,
          context
        );
      }

}
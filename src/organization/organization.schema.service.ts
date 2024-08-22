import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organization } from 'src/core/schemas/organization.schema';

@Injectable()
export class OrganizationSchemaService {
    constructor(@InjectModel(Organization.name) private organizationModel: Model<Organization>) { }

    getSchemaMetadata() {
        const schema = this.organizationModel.schema;
        const paths = schema.paths;

        const excludedFields = ['_id', '__v', 'createdAt', 'updatedAt', 'emailVerified'];
        const metadata = Object.keys(paths)
            .filter((path) => !excludedFields.includes(path)) // Exclude unwanted fields
            .map((path) => {
                const field = paths[path];
                return {
                    path,
                    instance: field.instance, // Data type
                    required: field.isRequired || false, // Whether the field is required
                    // enum: field.enumValues || null, // Enum values if any
                    formControl: field.options.formControl
                };
            });

        return metadata;
    }
}

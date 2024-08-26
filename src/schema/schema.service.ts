import { BadRequestException, Inject, Injectable } from '@nestjs/common'; 

@Injectable()
export class SchemaService {
    constructor(
        @Inject('dynamicModel') private readonly dynamicModel: Record<string, any>
    ) {}

    getSchemaMetadata(schemaName: string) {
        const model = this.dynamicModel[schemaName];
        
        if (!model) {
            throw new BadRequestException(`Model for schema '${schemaName}' not found`);
        }

        const schema = model.schema;
        const paths = schema.paths;

        const excludedFields = ['_id', '__v', 'createdAt', 'updatedAt', 'emailVerified'];
        const metadata = Object.keys(paths)
            .filter((path) => !excludedFields.includes(path))
            .map((path) => {
                const field = paths[path];
                return {
                    path,
                    instance: field.instance,
                    required: field.isRequired || false,
                    formControl: field.options?.formControl || null
                };
            });

        return metadata;
    }
}

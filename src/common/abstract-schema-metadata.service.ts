import { Model } from 'mongoose';

export abstract class AbstractSchemaMetadataService<T> {
    protected constructor(protected readonly model: Model<T>) {}

    getSchemaMetadata() {
        const schema = this.model.schema;
        const paths = schema.paths;

        const excludedFields = ['_id', '__v', 'createdAt', 'updatedAt'];
        const metadata = Object.keys(paths)
            .filter((path) => !excludedFields.includes(path))
            .map((path) => {
                const field = paths[path];
                return {
                    path,
                    instance: field.instance,
                    required: field.isRequired || false,
                };
            });

        return metadata;
    }
}

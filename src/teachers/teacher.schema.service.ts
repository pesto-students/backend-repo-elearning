import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher } from 'src/core/schemas/teacher.schema';

@Injectable()
export class TeacherSchemaService {
    constructor(@InjectModel(Teacher.name) private teacherModel: Model<Teacher>) { }

    getSchemaMetadata() {
        const schema = this.teacherModel.schema;
        const paths = schema.paths;

        const excludedFields = ['_id', '__v', 'createdAt', 'updatedAt'];
        const metadata = Object.keys(paths)
            .filter((path) => !excludedFields.includes(path)) // Exclude unwanted fields
            .map((path) => {
                const field = paths[path];
                return {
                    path,
                    instance: field.instance, // Data type
                    required: field.isRequired || false, // Whether the field is required
                    // enum: field.enumValues || null, // Enum values if any
                };
            });

        return metadata;
    }
}

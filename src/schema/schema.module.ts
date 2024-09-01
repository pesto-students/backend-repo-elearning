import { Module } from '@nestjs/common';
import { SchemaController } from './schema.controller';
import { SchemaService } from './schema.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from 'src/core/schemas/auth.schema';
import { Branch, BranchSchema } from 'src/core/schemas/branch.schema';
import { OnlineClass, OnlineClassSchema } from 'src/core/schemas/online-class.schema';
import { Organization, OrganizationSchema } from 'src/core/schemas/organization.schema';
import { Student, StudentSchema } from 'src/core/schemas/student.schema';
import { Teacher, TeacherSchema } from 'src/core/schemas/teacher.schema';
import { Parent, ParentSchema } from 'src/core/schemas/parent.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Teacher.name, schema: TeacherSchema },
      { name: Student.name, schema: StudentSchema },
      { name: Organization.name, schema: OrganizationSchema },
      { name: Branch.name, schema: BranchSchema },
      { name: Auth.name, schema: AuthSchema },
      { name: OnlineClass.name, schema: OnlineClassSchema },
      { name: Parent.name, schema: ParentSchema },
    ]),
  ],
  providers: [
    {
      provide: 'dynamicModel',
      useFactory: (
        teacherModel,
        studentModel,
        organizationModel,
        branchModel,
        authModel,
        onlineClassModel,
        parentsModel
      ) => ({
        Teacher: teacherModel,
        Student: studentModel,
        Organization: organizationModel,
        Branch: branchModel,
        Auth: authModel,
        OnlineClass: onlineClassModel,
        Parent: parentsModel,
      }),
      inject: [
        getModelToken(Teacher.name),
        getModelToken(Student.name),
        getModelToken(Organization.name),
        getModelToken(Branch.name),
        getModelToken(Auth.name),
        getModelToken(OnlineClass.name),
        getModelToken(Parent.name),
      ],
    },
    SchemaService,
  ],
  controllers: [SchemaController],
  exports: ['dynamicModel', SchemaService],
})
export class SchemaModule { }

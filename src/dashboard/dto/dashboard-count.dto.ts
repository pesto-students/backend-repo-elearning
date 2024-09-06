import { Types } from "mongoose";
import { ApiProperty } from '@nestjs/swagger';

export class commonCountConditionDto {
    branchId: Types.ObjectId;
    organizationId: Types.ObjectId;
}

export class DashboardCountsDto {
    @ApiProperty({ description: 'Number of teachers' })
    teacherCount: number;

    @ApiProperty({ description: 'Number of students' })
    studentCount: number;

    @ApiProperty({ description: 'Number of classes' })
    classCount: number;

    @ApiProperty({ description: 'Number of parents' })
    parentCount: number;

    @ApiProperty({ description: 'Number of online classes' })
    onlineClassCount: number;
}
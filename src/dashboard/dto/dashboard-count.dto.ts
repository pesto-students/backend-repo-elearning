import { Types } from "mongoose";

export class commonCountConditionDto{
    branchId: Types.ObjectId;
    organizationId: Types.ObjectId;
}


export class DashboardCountDto{
    student: {
        title: string;
        count: number;
    };
    teacher: {
        title: string;
        count: number;
    };
    parent: {
        title: string;
        count: number;
    };
    onlineClass: {
        title: string;
        count: number;
    };
    doubt: {
        title: string;
        count: number;
    };
    questionPaper: {
        title: string;
        count: number;
    };
    enableModule: {
        title: string;
        count: number;
    };
    branch: {
        title: string;
        count: number;
    };
    

    constructor(partial: Partial<DashboardCountDto>) {
        Object.assign(this, partial);
    }
}
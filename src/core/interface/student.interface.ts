export class StudentWithDetailsInterface {
    _id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: string;
    enrollmentDate: Date;
    address: string;
    pincode: string;
    email: string;
    phone: string;
    Branch: {
        _id?: string;
        name?: string;
    };
    city: {
        _id?: string;
        name?: string;
    };
    state: {
        _id?: string;
        name?: string;
    };
    country: {
        _id?: string;
        name?: string;
    };
}
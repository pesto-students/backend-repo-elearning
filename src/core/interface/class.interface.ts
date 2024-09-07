export interface ClassWithDetails {
    _id: string;
    className: string;
    branch: {
        _id?: string;
        name?: string;
    };
  }
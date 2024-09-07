export class OnlineClassWithDetails{
    _id: string;
    title: string;
    description?: string;
    branch: {
        _id?: string;
        name?: string;
    };
    createdBy: {
      _id?: string;
      name?: string;
    };
    class: {
      _id?: string;
      name?: string;
    };
}
export interface OrganizationWithDetails {
    _id: string;
    name: string;
    address: string;
    pincode: string;
    email: string;
    phone: string;
    organiZationType: {
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
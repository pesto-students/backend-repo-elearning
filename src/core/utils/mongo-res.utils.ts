export const transformId = (data: any) => {
    if (Array.isArray(data)) {
      return data.map(item => ({
        ...item,
        id: item._id.toString(),
        _id: undefined,
      }));
    }
    return {
      ...data,
      id: data._id.toString(),
      _id: undefined,
    };
  };
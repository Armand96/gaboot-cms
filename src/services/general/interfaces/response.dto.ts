class ResponseSuccess<T> {
  message: string;
  datum: T;
  data: T[];
  success: boolean;
  lastPage: number;
  totalData: number;

  toJson()
  {
    const data_tranfer = {};
    if (this.message?.length != 0) 
    {
      data_tranfer['message'] = this.message;
    }
    if (this.datum != null)
    {
      data_tranfer['data'] = this.message;
    }
    if (this.data?.length != 0)
    {
      data_tranfer['data'] = this.data;
    }
    if (this.lastPage != null)
    {
      data_tranfer['lastPage'] = this.lastPage;
    }
    if (this.totalData != null)
    {
      data_tranfer['totalData'] = this.totalData;
    }

    data_tranfer['success'] = this.success;

    return data_tranfer;
  }
}
export { ResponseSuccess };
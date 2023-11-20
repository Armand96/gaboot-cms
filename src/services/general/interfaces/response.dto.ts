class ResponseSuccess<T> {
  message: string;
  datum: T;
  data: T[];
  success: boolean;
  lastPage: number;
  totalData: number;

  toJson() {
    let ress: ResponseSuccess<T> = new ResponseSuccess<T>();
    if (this.message?.length != 0) ress.message = this.message;
    if (this.datum != null) ress.datum = this.datum;
    if (this.data?.length != 0) ress.data = this.data;
    if (this.lastPage != null) ress.lastPage = this.lastPage;
    if (this.totalData != null) ress.totalData = this.totalData;
    ress.success = this.success;

    this.clear();

    return ress;
  }

  private clear() {
    delete this.message;
    delete this.datum;
    delete this.data;
    delete this.lastPage;
    delete this.totalData;
  }
}
export { ResponseSuccess };
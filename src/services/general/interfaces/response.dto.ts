class ResponseSuccess<T> {
  message: string;
  datum: T;
  data: T[];
  success: boolean;
  lastPage: number;
  totalData: number;

  toJson() {
    if (this.message?.length != 0) this.message = this.message;
    if (this.datum != null) this.datum = this.datum;
    if (this.data?.length != 0) this.data = this.data;
    if (this.lastPage != null) this.lastPage = this.lastPage;
    if (this.totalData != null) this.totalData = this.totalData;

    this.success = this.success;

    return this;
  }
}
export { ResponseSuccess };
class ResponseSuccess<T> {
  message: string;
  datum: T;
  data: T[];
  success: boolean;
  lastPage: number;
  totalData: number;

  toJson() {
    const dataTransfer = this;
    // if (this.message?.length != 0) dataTransfer.message = this.message;
    // if (this.datum != null) dataTransfer.datum = this.datum;
    // if (this.data?.length != 0) dataTransfer.data = this.data;
    // if (this.lastPage != null) dataTransfer.lastPage = this.lastPage;
    // if (this.totalData != null) dataTransfer.totalData = this.totalData;

    // dataTransfer.success = this.success;

    return dataTransfer;
  }
}
export { ResponseSuccess };
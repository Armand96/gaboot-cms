class ResponseSuccess<T> {
  message: string = '';
  datum: T;
  data: T[];
  success: boolean = false;
  lastPage: number = 0;
  totalData: number = 0;
}
export { ResponseSuccess };
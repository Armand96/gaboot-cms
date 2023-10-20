import { Customer } from "../entities/customer.entity";

interface ResponseSuccessCustomer
{
  message: string;
  datum: Customer;
  data: Customer[];
  success: boolean;
  lastPage: number;
  totalData: number;
}

export { ResponseSuccessCustomer };

import { Product } from "../entities/product.entity";

interface ResponseSuccessProduct {
  message: string;
  datum: Product;
  data: Product[];
  success: boolean;
  lastPage: number;
  totalData: number;
}

export { ResponseSuccessProduct };

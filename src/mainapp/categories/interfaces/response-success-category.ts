import { Category } from "../entities/category.entity";

interface ResponseSuccessCategory {
  message: string;
  datum: Category;
  data: Category[];
  success: boolean;
  lastPage: number;
  totalData: number;
}

export { ResponseSuccessCategory };

import { User } from '../entities/user.entity';

interface ResponseSuccessUser {
  message: string;
  datum: User;
  data: User[];
  totalData: number;
  success: boolean;
  lastPage: number;
}

export { ResponseSuccessUser };

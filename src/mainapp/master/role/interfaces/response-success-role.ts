import { Role } from '../entities/role.entity';

interface ResponseSuccessRole {
    message: string;
    datum: Role;
    data: Role[];
    success: boolean;
    lastPage: number;
    totalData: number;
}

export { ResponseSuccessRole };

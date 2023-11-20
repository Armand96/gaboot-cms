import { Role } from '../../role/entities/role.entity';

export interface IUser {
    id: string;
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    token: string;
    isActive: boolean;
    imgPath: string;
    imgThumbPath: string;
    roleId: number;
    role: Role;
}

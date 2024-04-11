import { Role } from '../../role/entities/role.entity';

export interface IUser {
    id: string;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    token: string;
    is_active: boolean;
    image_path: string;
    thumbnail_path: string;
    role_id: string;
    role: Role;
}

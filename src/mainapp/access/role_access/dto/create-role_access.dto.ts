import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRoleAccessDto {
    @IsOptional()
    role_id: string;

    @IsOptional()
    menu_id: string;

    @IsOptional()
    submenu_id: string;

    @IsOptional()
    frontend_url: string;

    @IsOptional()
    backend_url: string;

    @IsNotEmpty()
    create_access: boolean;

    @IsNotEmpty()
    read_access: boolean;

    @IsNotEmpty()
    update_access: boolean;

    @IsNotEmpty()
    delete_access: boolean;
}

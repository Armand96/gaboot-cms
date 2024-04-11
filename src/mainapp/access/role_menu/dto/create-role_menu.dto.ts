import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateRoleSubmenuDto } from '../../role_submenu/dto/create-role_submenu.dto';

export class CreateRoleMenuDto {
    @IsNotEmpty()
    is_checked: boolean;

    @IsOptional()
    role_id: string;

    @IsNotEmpty()
    menu_id: string;

    @IsOptional()
    role_submenus: CreateRoleSubmenuDto[];

    @IsNotEmpty()
    create_access: boolean;

    @IsNotEmpty()
    read_access: boolean;

    @IsNotEmpty()
    update_access: boolean;

    @IsNotEmpty()
    delete_access: boolean;
}

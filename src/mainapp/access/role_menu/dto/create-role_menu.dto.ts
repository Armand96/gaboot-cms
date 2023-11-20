import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateRoleSubmenuDto } from '../../role_submenu/dto/create-role_submenu.dto';

export class CreateRoleMenuDto {
    @IsNotEmpty()
    isChecked: boolean;

    @IsOptional()
    roleId: number;

    @IsNotEmpty()
    menuId: number;

    @IsOptional()
    roleSubmenus: CreateRoleSubmenuDto[];

    @IsNotEmpty()
    createz: boolean;

    @IsNotEmpty()
    readz: boolean;

    @IsNotEmpty()
    updatez: boolean;

    @IsNotEmpty()
    deletez: boolean;
}

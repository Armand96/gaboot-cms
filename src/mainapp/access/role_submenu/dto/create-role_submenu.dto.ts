import { IsNotEmpty } from 'class-validator';

export class CreateRoleSubmenuDto {
    @IsNotEmpty()
    is_checked: boolean;

    @IsNotEmpty()
    role_id: string;

    @IsNotEmpty()
    rolemenu_id: string;

    @IsNotEmpty()
    submenu_id: string;

    @IsNotEmpty()
    create_access: boolean;

    @IsNotEmpty()
    read_access: boolean;

    @IsNotEmpty()
    update_access: boolean;

    @IsNotEmpty()
    delete_access: boolean;
}

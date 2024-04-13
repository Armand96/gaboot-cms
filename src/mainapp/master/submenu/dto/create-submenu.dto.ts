import { IsNotEmpty } from 'class-validator';

export class CreateSubmenuDto {
    @IsNotEmpty()
    menu_id: string;

    @IsNotEmpty()
    submenu_name: string;

    @IsNotEmpty()
    submenu_icon: string;

    @IsNotEmpty()
    frontend_url: string;

    @IsNotEmpty()
    backend_url: string;

    @IsNotEmpty()
    submenu_is_active: boolean;
}

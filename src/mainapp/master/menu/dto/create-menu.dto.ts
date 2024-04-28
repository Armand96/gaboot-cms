import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMenuDto {
    @IsNotEmpty()
    menu_name: string;

    @IsNotEmpty()
    menu_icon: string;

    @IsOptional()
    frontend_url: string;

    @IsOptional()
    backend_url: string;

    @IsOptional()
    menu_have_child: boolean;

    @IsOptional()
    menu_is_active: boolean;
}

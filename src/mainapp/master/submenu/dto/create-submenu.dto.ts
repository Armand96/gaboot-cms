import { IsNotEmpty } from 'class-validator';

export class CreateSubmenuDto {
    @IsNotEmpty()
    menuId: number;

    @IsNotEmpty()
    submenuName: string;

    @IsNotEmpty()
    submenuIcon: string;

    @IsNotEmpty()
    frontendUrl: string;

    @IsNotEmpty()
    backendUrl: string;

    @IsNotEmpty()
    submenuIsActive: boolean;
}

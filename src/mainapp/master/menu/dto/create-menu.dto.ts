import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMenuDto {
    @IsNotEmpty()
    menuName: string;

    @IsNotEmpty()
    menuIcon: string;

    @IsOptional()
    frontendUrl: string;

    @IsOptional()
    backendUrl: string;

    @IsNotEmpty()
    menuHaveChild: boolean;

    @IsNotEmpty()
    menuIsActive: boolean;
}

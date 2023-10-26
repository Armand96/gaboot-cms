import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRoleAccessDto {
  @IsOptional()
  roleId: number;

  @IsOptional()
  menuId: number;

  @IsOptional()
  submenuId: number;

  @IsOptional()
  frontendUrl: string;

  @IsOptional()
  backendUrl: string;

  @IsNotEmpty()
  createz: boolean;

  @IsNotEmpty()
  readz: boolean;

  @IsNotEmpty()
  updatez: boolean;

  @IsNotEmpty()
  deletez: boolean;
}

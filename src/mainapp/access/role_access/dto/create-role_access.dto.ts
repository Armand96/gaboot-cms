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
  create: boolean;

  @IsNotEmpty()
  read: boolean;

  @IsNotEmpty()
  updates: boolean;

  @IsNotEmpty()
  delete: boolean;
}

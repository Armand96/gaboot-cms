import { IsNotEmpty } from 'class-validator';

export class CreateRoleSubmenuDto {

  @IsNotEmpty()
  isChecked: boolean;

  @IsNotEmpty()
  roleId: number;

  @IsNotEmpty()
  roleMenuId: number;

  @IsNotEmpty()
  submenuId: number;

  @IsNotEmpty()
  create: boolean;

  @IsNotEmpty()
  read: boolean;

  @IsNotEmpty()
  updates: boolean;

  @IsNotEmpty()
  delete: boolean;
}

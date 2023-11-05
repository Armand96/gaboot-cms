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
  createz: boolean;

  @IsNotEmpty()
  readz: boolean;

  @IsNotEmpty()
  updatez: boolean;

  @IsNotEmpty()
  deletez: boolean;
}

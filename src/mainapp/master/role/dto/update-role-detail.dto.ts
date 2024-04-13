import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { UpdateRoleDto } from './update-role.dto';
import { CreateRoleMenuDto } from 'src/mainapp/access/role_menu/dto/create-role_menu.dto';

export class UpdateRoleDetailDto extends UpdateRoleDto {
    // @IsNotEmpty()
    // @Type(() => CreateRoleAccessDto)
    // @ValidateNested()
    // roleAccess: CreateRoleAccessDto[];

    @IsNotEmpty()
    @Type(() => CreateRoleMenuDto)
    @ValidateNested()
    role_menus: CreateRoleMenuDto[];
}

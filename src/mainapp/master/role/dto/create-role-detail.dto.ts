import { Type } from 'class-transformer';
import { CreateRoleDto } from './create-role.dto';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateRoleMenuDto } from 'src/mainapp/access/role_menu/dto/create-role_menu.dto';
// import { CreateRoleAccessDto } from 'src/access/role_access/dto/create-role_access.dto';


export class CreateRoleDetailDto extends CreateRoleDto {
    // @IsNotEmpty()
    // @Type(() => CreateRoleAccessDto)
    // @ValidateNested()
    // roleAccess: CreateRoleAccessDto[];

    @IsNotEmpty()
    @Type(() => CreateRoleMenuDto)
    @ValidateNested()
    roleMenus: CreateRoleMenuDto[];
}

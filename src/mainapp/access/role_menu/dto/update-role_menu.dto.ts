import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleMenuDto } from './create-role_menu.dto';

export class UpdateRoleMenuDto extends PartialType(CreateRoleMenuDto) {}

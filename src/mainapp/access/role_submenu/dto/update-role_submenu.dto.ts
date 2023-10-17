import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleSubmenuDto } from './create-role_submenu.dto';

export class UpdateRoleSubmenuDto extends PartialType(CreateRoleSubmenuDto) {}

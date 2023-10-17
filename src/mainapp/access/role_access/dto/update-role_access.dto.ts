import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleAccessDto } from './create-role_access.dto';

export class UpdateRoleAccessDto extends PartialType(CreateRoleAccessDto) {}

import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { isRoleAlreadyExists } from './rule/is-unique-rolename.decorator';

export class CreateRoleDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    // @isRoleAlreadyExists({ message: 'role name already exists', always: true })
    role_name: string;
}

import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateRoleDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    role_name: string;
}

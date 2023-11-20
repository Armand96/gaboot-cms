import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthDto {
    @IsNotEmpty()
    @ApiProperty()
    username: string;

    @IsNotEmpty()
    @ApiProperty()
    password: string;
}

import {
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';
import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsNotEmpty()
    @ApiProperty()
    // @IsUserAlreadyExist({ message: 'username has been taken', always: true })
    username: string;

    @IsNotEmpty()
    @ApiProperty()
    // @IsUserAlreadyExist({ message: 'username has been taken', always: true })
    email: string;

    @IsNotEmpty()
    @ApiProperty()
    firstname: string;

    @IsNotEmpty()
    @ApiProperty()
    lastname: string;

    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @IsNotEmpty()
    @ApiProperty()
    is_active: boolean;

    @IsNotEmpty()
    @ApiProperty()
    role_id: string;

    @Optional()
    @ApiProperty()
    image_path: string;

    @Optional()
    @ApiProperty()
    thumbnail_path: string;
}

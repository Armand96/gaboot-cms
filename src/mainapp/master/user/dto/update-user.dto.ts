import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Optional } from '@nestjs/common';
// import { IsUserAlreadyExist } from './rule/is-unique-username.decorator';

export class UpdateUserDto {
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

    // @IsNotEmpty()
    // @ApiProperty()
    // password: string;

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

    @IsOptional()
    @ApiProperty()
    updated_at: string;

    @IsOptional()
    @ApiProperty()
    password: string;
}
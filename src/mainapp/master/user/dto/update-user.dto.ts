import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Optional } from '@nestjs/common';
// import { IsUserAlreadyExist } from './rule/is-unique-username.decorator';

export class UpdateUserDto {
    @IsNotEmpty()
    @ApiProperty()
    // @IsUserAlreadyExist({ message: 'username has been taken', always: true })
    userName: string;

    @IsNotEmpty()
    @ApiProperty()
    // @IsUserAlreadyExist({ message: 'username has been taken', always: true })
    email: string;

    @IsNotEmpty()
    @ApiProperty()
    firstName: string;

    @IsNotEmpty()
    @ApiProperty()
    lastName: string;

    // @IsNotEmpty()
    // @ApiProperty()
    // password: string;

    @IsNotEmpty()
    @ApiProperty()
    isActive: boolean;

    @IsNotEmpty()
    @ApiProperty()
    roleId: number;

    @Optional()
    @ApiProperty()
    imgPath: string;

    @Optional()
    @ApiProperty()
    imgThumbPath: string;

    @IsOptional()
    @ApiProperty()
    updatedAt: string;

    @IsOptional()
    @ApiProperty()
    password: string;
}
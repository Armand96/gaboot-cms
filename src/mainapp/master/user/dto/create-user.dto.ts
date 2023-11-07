import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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

  @IsNotEmpty()
  @ApiProperty()
  password: string;

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
}

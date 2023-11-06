import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  // @IsUserAlreadyExist({ message: 'username has been taken', always: true })
  userName: string;

  @IsNotEmpty()
  @IsString()
  // @IsUserAlreadyExist({ message: 'username has been taken', always: true })
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @IsNotEmpty()
  @IsInt()
  roleId: number;

  @Optional()
  @IsString()
  imgPath: string;

  @Optional()
  @IsString()
  imgThumbPath: string;
}

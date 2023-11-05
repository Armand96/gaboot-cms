import { IsNotEmpty } from 'class-validator';
import { Optional } from '@nestjs/common';

export class CreateUserDto {
  @IsNotEmpty()
  // @IsUserAlreadyExist({ message: 'username has been taken', always: true })
  userName: string;

  @IsNotEmpty()
  // @IsUserAlreadyExist({ message: 'username has been taken', always: true })
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  isActive: boolean;

  @IsNotEmpty()
  roleId: number;

  @Optional()
  imgPath: string;

  @Optional()
  imgThumbPath: string;
}

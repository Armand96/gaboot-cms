import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsOptional } from 'class-validator';
// import { IsUserAlreadyExist } from './rule/is-unique-username.decorator';

export class UpdateUserDto {
    @IsNotEmpty()
    // @IsUserAlreadyExist({ message: "username has been taken", always: true})
    userName: string;

    @IsNotEmpty()
    // @IsUserAlreadyExist({ message: "username has been taken", always: true})
    email: string;

    @IsNotEmpty()
    fullName: string;

    @IsOptional()
    password: string;

    @IsNotEmpty()
    isActive: boolean;

    @IsNotEmpty()
    roleId: number;

    @Optional()
    imgPath: string;
  
    @Optional()
    imgThumbPath: string;

    @Optional()
    updatedAt: string;
}

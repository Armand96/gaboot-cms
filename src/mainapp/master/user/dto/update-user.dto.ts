import { IsNotEmpty, IsOptional } from 'class-validator';
// import { IsUserAlreadyExist } from './rule/is-unique-username.decorator';

export class UpdateUserDto {
  @IsNotEmpty()
  // @IsUserAlreadyExist({ message: "username has been taken", always: true})
  userName: string;

  @IsNotEmpty()
  // @IsUserAlreadyExist({ message: 'username has been taken', always: true })
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  password: string;

  @IsNotEmpty()
  isActive: boolean;

  @IsNotEmpty()
  roleId: number;

  @IsOptional()
  imgPath: string;

  @IsOptional()
  imgThumbPath: string;

  @IsOptional()
  updatedAt: string;
}

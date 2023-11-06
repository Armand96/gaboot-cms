import { IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
// import { IsUserAlreadyExist } from './rule/is-unique-username.decorator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

  @IsOptional()
  @ApiProperty()
  updatedAt: string;
}

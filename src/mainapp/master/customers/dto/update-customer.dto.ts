import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';
import { Optional } from '@nestjs/common';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) 
{
  @Optional()
  updatedAt: string;
}

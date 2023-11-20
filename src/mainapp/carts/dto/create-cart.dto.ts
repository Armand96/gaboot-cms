import { IsNotEmpty } from 'class-validator';

export class CreateCartDto {
    @IsNotEmpty()
    customerId: number;
    @IsNotEmpty()
    productId: number;
    @IsNotEmpty()
    price: number;
    @IsNotEmpty()
    quantity: number;
}

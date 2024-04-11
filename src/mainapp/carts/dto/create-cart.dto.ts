import { IsNotEmpty } from 'class-validator';

export class CreateCartDto {
    @IsNotEmpty()
    customer_id: string;
    @IsNotEmpty()
    product_id: string;
    @IsNotEmpty()
    price: number;
    @IsNotEmpty()
    quantity: number;
}

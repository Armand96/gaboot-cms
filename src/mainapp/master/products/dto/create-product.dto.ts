import { Optional } from '@nestjs/common';

export class CreateProductDto {
    name: string;
    description: string;
    stock: number;
    dimension: string;
    weight: number;
    weight_unit: string;
    category_id: string;
    @Optional()
    image_path: string;
    @Optional()
    thumbnail_path: string;
}

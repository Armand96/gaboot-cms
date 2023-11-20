import {
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { Product } from './product.entity';

@Table({
    tableName: 'product_images',
    timestamps: true,
    defaultScope: {
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
    },
})
export class ProductImage extends Model {
    @Column
    imagePath: string;

    @Column
    thumbnailPath: string;

    @ForeignKey(() => Product)
    @Column
    productId: number;

    @BelongsTo(() => Product)
    product: Product;
}

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
    createdAt: 'created_at', updatedAt: 'updated_at',
    defaultScope: {
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
    },
})
export class ProductImage extends Model {
    @Column
    image_path: string;

    @Column
    thumbnail_path: string;

    @ForeignKey(() => Product)
    @Column
    product_id: string;

    @BelongsTo(() => Product)
    product: Product;
}

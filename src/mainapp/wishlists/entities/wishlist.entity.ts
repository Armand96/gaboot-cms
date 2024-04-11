import {
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { Product } from 'src/mainapp/master/products/entities/product.entity';

@Table({
    tableName: 'wishlists',
    timestamps: true,
    createdAt: 'created_at', updatedAt: 'updated_at',
    defaultScope: {
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
    },
})
export class Wishlist extends Model {
    @ForeignKey(() => Product)
    @Column
    product_id: string;

    @Column
    category: string;

    @BelongsTo(() => Product)
    products: Product;
}

import {
    BelongsTo,
    Column,
    ForeignKey,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';
import { Category } from 'src/mainapp/categories/entities/category.entity';
import { Wishlist } from 'src/mainapp/wishlists/entities/wishlist.entity';
import { ProductImage } from './product.image.entity';

@Table({
    tableName: 'master_products',
    timestamps: true,
    createdAt: 'created_at', updatedAt: 'updated_at',
    defaultScope: {
        // attributes: {
        //     exclude: ['createdAt', 'updatedAt'],
        // },
    },
})
export class Product extends Model {
    @Column
    name: string;

    @Column
    description: string;

    @Column
    price: number;

    @Column
    stock: number;

    @Column
    dimension: string;

    @Column
    weight: number;

    @Column
    weight_unit: string;

    @Column
    is_active: boolean;

    @ForeignKey(() => Category)
    @Column
    category_id: string;

    @BelongsTo(() => Category)
    category: Category;

    @HasMany(() => Wishlist)
    wishlists: Wishlist[];

    @HasMany(() => ProductImage)
    images: ProductImage[];
}

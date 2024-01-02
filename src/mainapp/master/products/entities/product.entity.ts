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
    weightUnit: string;

    @Column
    isActive: boolean;

    @ForeignKey(() => Category)
    @Column
    categoryId: number;

    @BelongsTo(() => Category)
    category: Category;

    @HasMany(() => Wishlist)
    wishlists: Wishlist[];

    @HasMany(() => ProductImage)
    images: ProductImage[];
}

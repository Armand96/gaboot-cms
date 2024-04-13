import { Column, HasMany, Model, Table, Unique } from 'sequelize-typescript';
import { Product } from 'src/mainapp/master/products/entities/product.entity';

@Table({
    tableName: 'categories',
    timestamps: true,
    createdAt: 'created_at', updatedAt: 'updated_at',
    defaultScope: {
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
    },
})
export class Category extends Model {
    @Unique
    @Column
    name: string;

    @Column
    description: string;

    @Column
    image_path: string;

    @Column
    thumbnail_path: string;

    @HasMany(() => Product)
    products: Product[];
}

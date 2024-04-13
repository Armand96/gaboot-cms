import {
    BelongsTo,
    Column,
    ForeignKey,
    HasMany,
    HasOne,
    Model,
    Table,
    Unique,
} from 'sequelize-typescript';
import { Customer } from 'src/mainapp/master/customers/entities/customer.entity';
import { Product } from 'src/mainapp/master/products/entities/product.entity';

@Table({
    tableName: 'carts',
    timestamps: true,
    createdAt: 'created_at', updatedAt: 'updated_at',
    defaultScope: {
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
    },
})
export class Cart extends Model {
    @ForeignKey(() => Customer)
    @Column
    customer_id: string;

    @ForeignKey(() => Product)
    @Column
    product_id: string;

    @Column
    price: number;

    @Column
    quantity: number;

    @Column
    subtotal: number;

    @Column
    is_checkout: boolean;

    @BelongsTo(() => Product)
    product: Product;

    @BelongsTo(() => Customer)
    customer: Customer;
}

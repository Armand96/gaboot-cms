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
    defaultScope: {
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
    },
})
export class Cart extends Model {
    @ForeignKey(() => Customer)
    @Column
    customerId: number;

    @ForeignKey(() => Product)
    @Column
    productId: number;

    @Column
    price: number;

    @Column
    quantity: number;

    @BelongsTo(() => Product)
    product: Product;

    @BelongsTo(() => Customer)
    customer: Customer;
}

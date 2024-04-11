import {
    BelongsTo,
    Column,
    ForeignKey,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';
import { Product } from 'src/mainapp/master/products/entities/product.entity';
import { Order } from 'src/mainapp/order/entities/order.entity';

@Table({
    tableName: 'order_details',
    timestamps: true,
    createdAt: 'created_at', updatedAt: 'updated_at',
    defaultScope: {
        // attributes: {
        //     exclude: ['createdAt', 'updatedAt'],
        // },
    },
})
export class OrderDetail extends Model {
    @Column
    @ForeignKey(() => Order)
    order_id: string;

    @Column
    @ForeignKey(() => Product)
    product_id: string;

    @Column
    price: number;

    @Column
    discount: number;

    @Column
    quantity: number;

    @Column
    total: number;

    @BelongsTo(() => Order)
    order_header: Order;

    @BelongsTo(() => Product)
    product: Product;
}

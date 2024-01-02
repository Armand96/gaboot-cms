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
    defaultScope: {
        // attributes: {
        //     exclude: ['createdAt', 'updatedAt'],
        // },
    },
})
export class OrderDetail extends Model {
    @Column
    @ForeignKey(() => Order)
    orderId: number;
    
    @Column
    @ForeignKey(() => Product)
    productId: number;
    
    @Column
    price: number;
    
    @Column
    discount: number;
    
    @Column
    quantity: number;
    
    @Column
    total: number;

    @BelongsTo(() => Order)
    orderHeader: Order;

    @BelongsTo(() => Product)
    product: Product;
}

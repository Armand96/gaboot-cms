import {
    BelongsTo,
    Column,
    ForeignKey,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';
import { OrderDetail } from './order-detail.entity';
import { Customer } from 'src/mainapp/master/customers/entities/customer.entity';
import { OrderStatus } from './order-status';

@Table({
    tableName: 'orders',
    timestamps: true,
    createdAt: 'created_at', updatedAt: 'updated_at',
    defaultScope: {
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
    },
})
export class Order extends Model {
    @Column
    name: string;

    @Column
    @ForeignKey(() => Customer)
    customer_id: string; //Orders owner

    @Column
    total_price: number;

    @Column
    discount: number;

    @Column
    grand_total: number;

    @Column
    total_item: number;

    @Column
    status: OrderStatus;

    @Column
    expired: string; //if order not paid before 24 hours order status must be cancelled

    @HasMany(() => OrderDetail)
    order_detail: OrderDetail[];

    @BelongsTo(() => Customer)
    customer: Customer;
}

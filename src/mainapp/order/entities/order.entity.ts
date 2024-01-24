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
    customerId: number; //Orders owner

    @Column
    totalPrice: number;

    @Column
    discount: number;

    @Column
    grandTotal: number;

    @Column
    totalItem: number;

    @Column
    status: OrderStatus;

    @Column
    expired: string; //if order not paid before 24 hours order status must be cancelled

    @HasMany(() => OrderDetail)
    orderDetail: OrderDetail[];

    @BelongsTo(() => Customer)
    customer: Customer;
}

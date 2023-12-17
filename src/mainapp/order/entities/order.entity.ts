import {
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';

enum OrderStatus {
    OPEN = 'OPEN',
    SUCCESS = 'SUCCESS',
    CANCELLED = 'CANCELLED',
}

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
    customerId: number; //Orders owner

    @Column
    totalPrice: number;

    @Column
    priceCut: number;

    @Column
    grandTotal: number;

    @Column
    totalItem: number;

    @Column
    status: OrderStatus;

    @Column
    expired: string; //if order not paid before 24 hours order status must be cancelled
}

import {
    Column,
    ForeignKey,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';
import { Product } from 'src/mainapp/master/products/entities/product.entity';

enum PaymentType {
    BANK = 'BANK',
    VIRTUAL_ACCOUNT = 'VIRTUAL_ACCOUNT',
    EWALLET = 'EWALLET',
    CREDIT_CARD = 'CREDIT_CARD',
}

@Table({
    tableName: 'payments',
    timestamps: true,
    createdAt: 'created_at', updatedAt: 'updated_at',
    defaultScope: {
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
    },
})
export class Payment extends Model {
    @Column
    order_id: string;

    @Column
    name: string;

    @Column
    transaction_id: string;

    @Column
    merchant_id: string;

    @Column
    payment_type: PaymentType;

    @Column
    description: string;

    @Column
    transaction_time: string;

    @Column
    transaction_status: string;

    @Column
    fraud_status: string;

    @Column
    bank: string;

    @Column
    va_number: string;

    @Column
    currency: string;

    @Column
    expiry_time: string
}

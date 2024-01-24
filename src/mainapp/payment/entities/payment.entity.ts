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
    defaultScope: {
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
    },
})
export class Payment extends Model {
    @Column
    orderId: number;
    
    @Column
    name: string;
    
    @Column
    transactionId: string;

    @Column
    merchantId: string;

    @Column
    paymentType: PaymentType;

    @Column
    description: string;

    @Column
    transactionTime: string;

    @Column
    transactionStatus: string;

    @Column
    fraudStatus: string;

    @Column
    bank: string;

    @Column
    vaNumber: string;

    @Column
    currency: string;

    @Column
    expiry_time: string
}

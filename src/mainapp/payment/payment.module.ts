import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Payment } from './entities/payment.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from '../order/entities/order.entity';

@Module({
    imports: [SequelizeModule.forFeature([Payment, Order])],
    controllers: [PaymentController],
    providers: [PaymentService],
})
export class PaymentModule {}

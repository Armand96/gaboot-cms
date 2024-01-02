import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { ResponseSuccess } from 'src/services/general/interfaces/response.dto';
import { OrderDetail } from './entities/order-detail.entity';

@Module({
    imports: [SequelizeModule.forFeature([Order, OrderDetail])],
    controllers: [OrderController],
    providers: [OrderService, ResponseSuccess],
})
export class OrderModule {}

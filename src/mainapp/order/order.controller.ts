import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Request } from 'express';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';

@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
    ) {}

    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.orderService.create(createOrderDto);
    }

    @Get()
    findAll(@Req() req: Request) {
        return this.orderService.findAll(req);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.orderService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
        return this.orderService.update(id, updateOrderDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.orderService.remove(id);
    }

    /* ================================ ORDER DETAILS ================================ */
    @Get('detail')
    findAllDetail(@Req() req: Request) {
        return this.orderService.findAllDetail(req);
    }

    @Get('detail/:id')
    findOneDetail(@Param('id') id: string) {
        return this.orderService.findOneDetail(id);
    }

    @Patch('detail/:id')
    updateDetail(@Param('id') id: string, @Body() updateOrderDetailDto: UpdateOrderDetailDto) {
        return this.orderService.update(id, updateOrderDetailDto);
    }

}

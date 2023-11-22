import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectModel } from '@nestjs/sequelize';
import { ResponseSuccess } from 'src/services/general/interfaces/response.dto';
import { Request } from 'express';
import { Op } from 'sequelize';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order) private orderModel: typeof Order,
        private response: ResponseSuccess<Order>,
    ) {}

    async create(createOrderDto: CreateOrderDto) {
        return `This is unused`;
    }

    async findAll(req: Request) {
        const page = req.query.page == null ? 0 : Number(req.query.page) - 1;
        const limit = req.query.limit == null ? 10 : Number(req.query.limit);

        const filterData: any = {};
        if (req.query.name != undefined && req.query.name != '')
            filterData.name = {
                [Op.like]: `%${req.query.name}%`,
            };

        const orders = await this.orderModel.findAll({
            limit: limit,
            offset: page * limit,
            where: filterData,
        });

        if (orders.length == 0) {
            this.response.message = 'No Data Found';
            this.response.success = false;

            return this.response.toJson();
        }

        this.response.message = 'Success Get Orders';
        this.response.success = true;
        this.response.data = orders;

        return this.response.toJson();
    }

    async findOne(id: number) {
        const order = await this.orderModel.findOne({
            where: { id: id },
        });

        if (order == null) {
            throw new NotFoundException('Not Data Found');
        }

        this.response.message = 'Success Get Order';
        this.response.success = true;
        this.response.datum = order;

        return this.response.toJson();
    }

    async update(id: number, updateOrderDto: UpdateOrderDto) {
        const dataUpdate: any = updateOrderDto;

        await this.orderModel.update(dataUpdate, { where: { id: id } });
        const menu = await this.orderModel.findOne({ where: { id: id } });

        this.response.message = 'Success Update Category Data';
        this.response.success = true;
        this.response.datum = menu;

        return this.response.toJson();
    }

    async remove(id: number) {
        return `This action removes a #${id} order`;
    }
}

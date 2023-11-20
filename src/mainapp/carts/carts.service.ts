import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './entities/cart.entity';
import { ResponseSuccess } from 'src/services/general/interfaces/response.dto';
import { Request } from 'express';
import { Op } from 'sequelize';

@Injectable()
export class CartsService {
    constructor(
        @InjectModel(Cart)
        private cart: typeof Cart,
    ) {}

    async create(createCartDto: CreateCartDto) {
        const resSuccess = new ResponseSuccess<Cart>();

        const dataCreate: any = createCartDto;

        const cart = await this.cart.create(dataCreate);

        resSuccess.message = 'Success Insert Cart Data';
        resSuccess.success = true;
        resSuccess.datum = cart;

        return resSuccess;
    }

    async findAll(req: Request) {
        const resSuccess = new ResponseSuccess<Cart>();

        const page = req.query.page == null ? 0 : Number(req.query.page) - 1;
        const limit = req.query.limit == null ? 10 : Number(req.query.limit);
        /* FILTER DATA */
        // console.log(req.query)
        const filterData: any = {};
        if (req.query.name != undefined && req.query.name != '')
            filterData.name = {
                [Op.like]: `%${req.query.name}%`,
            };

        const carts = await this.cart.findAll({
            limit: limit,
            offset: page * limit,
            where: filterData,
        });

        resSuccess.message = 'Success Get Carts';
        resSuccess.success = true;
        resSuccess.data = carts;

        return resSuccess;
    }

    async findOne(id: number) {
        const resSuccess = new ResponseSuccess<Cart>();

        const cart = await this.cart.findOne({
            where: { id: id },
        });

        resSuccess.message = 'Success Get Cart';
        resSuccess.success = true;
        resSuccess.datum = cart;

        return resSuccess;
    }

    async update(id: number, updateCartDto: UpdateCartDto) {
        const resSuccess = new ResponseSuccess<Cart>();
        const dataUpdate: any = updateCartDto;

        await this.cart.update(dataUpdate, { where: { id: id } });
        const menu = await this.cart.findOne({ where: { id: id } });

        resSuccess.message = 'Success Update Cart Data';
        resSuccess.success = true;
        resSuccess.datum = menu;

        return resSuccess;
    }

    async remove(id: number) {
        const resSuccess = new ResponseSuccess<Cart>();

        await this.cart.destroy({
            where: { id: id },
        });

        resSuccess.message = 'Success Delete Cart Data';
        resSuccess.success = true;
        resSuccess.datum = null;

        return resSuccess;
    }
}

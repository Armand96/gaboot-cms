import { Injectable, NotFoundException } from '@nestjs/common';
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

    private response = new ResponseSuccess<Cart>();

    async create(createCartDto: CreateCartDto) {
        

        const dataCreate: any = createCartDto;

        const cart = await this.cart.create(dataCreate);

        this.response.message = 'Success Insert Cart Data';
        this.response.success = true;
        this.response.datum = cart;

        return this.response.toJson();
    }

    async findAll(req: Request) {
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

        if (carts.length == 0)
        {
            this.response.message = 'No Data Found';
            this.response.success = false;

            return this.response.toJson();
        }

        this.response.message = 'Success Get Carts';
        this.response.success = true;
        this.response.data = carts;

        return this.response.toJson();
    }

    async findOne(id: number) {
        const cart = await this.cart.findOne({
            where: { id: id },
        });

        if (!cart)
            throw new NotFoundException('No data found');

        this.response.message = 'Success Get Cart';
        this.response.success = true;
        this.response.datum = cart;

        return this.response.toJson();
    }

    async update(id: number, updateCartDto: UpdateCartDto) {
        
        const dataUpdate: any = updateCartDto;

        await this.cart.update(dataUpdate, { where: { id: id } });
        const menu = await this.cart.findOne({ where: { id: id } });

        this.response.message = 'Success Update Cart Data';
        this.response.success = true;
        this.response.datum = menu;

        return this.response.toJson();
    }

    async remove(id: number) {
        

        await this.cart.destroy({
            where: { id: id },
        });

        this.response.message = 'Success Delete Cart Data';
        this.response.success = true;
        this.response.datum = null;

        return this.response.toJson();
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { Op } from 'sequelize';
import { ResponseSuccess } from 'src/services/general/interfaces/response.dto';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class PaymentService {
    constructor(
        @InjectModel(Payment) private payments: typeof Payment
    ) {}

    private response = new ResponseSuccess<Payment>();

    async create(createPaymentDto: CreatePaymentDto) {
        return 'This action adds a new payment';
    }

    async findAll(req: Request) {
        const page = req.query.page == null ? 0 : Number(req.query.page) - 1;
        const limit = req.query.limit == null ? 10 : Number(req.query.limit);

        const filterData: any = {};
        if (req.query.name != undefined && req.query.name != '')
            filterData.name = {
                [Op.like]: `%${req.query.name}%`,
            };

        const wishlists = await this.payments.findAll({
            limit: limit,
            offset: page * limit,
            where: filterData,
        });

        if (wishlists.length == 0) {
            this.response.message = 'Payments data empty';
            this.response.success = true;

            return this.response.toJson();
        }

        this.response.message = 'Success Get Payments';
        this.response.success = true;
        this.response.data = wishlists;

        return this.response.toJson();
    }

    async findOne(id: number) {
        const wishlist = await this.payments.findOne({
            where: { id: id },
        });

        if (wishlist == null) {
            throw new NotFoundException('Not Data Found');
        }

        this.response.message = 'Success Get Payment';
        this.response.success = true;
        this.response.datum = wishlist;

        return this.response.toJson();
    }

    async update(id: number, updatePaymentDto: UpdatePaymentDto) {
        return `This action updates a #${id} payment`;
    }

    async remove(id: number) {
        return `This action removes a #${id} payment`;
    }

    async paymentCallback(midtrans: any)
    {
        const payment = await this.payments.update(midtrans.transaction_status, {
            where: { transaction_id: midtrans.transaction_id }
        });

        this.response.message = 'Callback proceed successfully';
        this.response.success = true;

        return this.response.toJson();
    }
    
    // @Interval(1000)
    // async handleCronAssetCleaning()
    // {
	// 	console.log('Running Scheldule Test');
	// }
}

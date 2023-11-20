import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
    async create(createPaymentDto: CreatePaymentDto) {
        return 'This action adds a new payment';
    }

    async findAll() {
        return `This action returns all payment`;
    }

    async findOne(id: number) {
        return `This action returns a #${id} payment`;
    }

    async update(id: number, updatePaymentDto: UpdatePaymentDto) {
        return `This action updates a #${id} payment`;
    }

    async remove(id: number) {
        return `This action removes a #${id} payment`;
    }
}

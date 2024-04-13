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
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Request, request } from 'express';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post()
    create(@Body() createPaymentDto: CreatePaymentDto) {
        return this.paymentService.create(createPaymentDto);
    }

    @Get()
    findAll(@Req() req: Request) {
        return this.paymentService.findAll(req);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.paymentService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updatePaymentDto: UpdatePaymentDto,
    ) {
        return this.paymentService.update(id, updatePaymentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.paymentService.remove(id);
    }

    @Post('/callback')
    paymentCallback(@Body() body: any)
    {
        return this.paymentService.paymentCallback(body)
    }
}

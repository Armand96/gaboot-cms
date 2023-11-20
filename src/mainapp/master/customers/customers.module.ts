import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customer } from './entities/customer.entity';
import { GeneralService } from 'src/services/general/general.service';

@Module({
    imports: [SequelizeModule.forFeature([Customer])],
    controllers: [CustomersController],
    providers: [CustomersService, GeneralService],
})
export class CustomersModule {}

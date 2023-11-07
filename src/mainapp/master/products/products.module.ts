import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { GeneralService } from 'src/services/general/general.service';
import { ProductImage } from './entities/product.image.entity';
import { ResponseSuccess } from 'src/services/general/interfaces/response.dto';

@Module({
  imports: [SequelizeModule.forFeature([Product, ProductImage])],
  controllers: [ProductsController],
  providers: [ProductsService, GeneralService, ResponseSuccess<Product>],
})
export class ProductsModule {}

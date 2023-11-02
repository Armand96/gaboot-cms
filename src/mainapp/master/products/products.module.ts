import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { GeneralService } from 'src/services/general/general.service';
import { ProductImage } from './entities/product.image.entity';

@Module({
  imports: [SequelizeModule.forFeature([Product, ProductImage])],
  controllers: [ProductsController],
  providers: [ProductsService, GeneralService],
})
export class ProductsModule {}

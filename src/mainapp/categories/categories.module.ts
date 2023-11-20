import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './entities/category.entity';
import { GeneralService } from 'src/services/general/general.service';
import { ResponseSuccess } from 'src/services/general/interfaces/response.dto';

@Module({
    imports: [SequelizeModule.forFeature([Category])],
    controllers: [CategoriesController],
    providers: [CategoriesService, GeneralService, ResponseSuccess<Category>],
})
export class CategoriesModule {}

import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Banner } from './entities/banner.entity';
import { GeneralService } from 'src/services/general/general.service';
import { ResponseSuccess } from 'src/services/general/interfaces/response.dto';

@Module({
    imports: [SequelizeModule.forFeature([Banner])],
    controllers: [BannerController],
    providers: [BannerService, GeneralService, ResponseSuccess<Banner>],
})
export class BannerModule { }

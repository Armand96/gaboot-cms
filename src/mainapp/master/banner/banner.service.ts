import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Banner } from './entities/banner.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { GeneralService } from 'src/services/general/general.service';
import { PathImageObj } from 'src/services/general/interfaces/path-image';
import { ResponseSuccess } from 'src/services/general/interfaces/response.dto';
import { Op } from 'sequelize';

@Injectable()
export class BannerService {

    constructor(
        @InjectModel(Banner)
        private banner: typeof Banner,
        private gen: GeneralService,
        private response: ResponseSuccess<Banner>,
    ) { }

    async create(createBannerDto: CreateBannerDto, image: Express.Multer.File,) {
        const dataCreate: any = createBannerDto;
        let pathObj = {} as PathImageObj;

        if (image != null) {
            pathObj = await this.gen.uploadImage(
                image,
                `${dataCreate.name}${Date.now()}`,
                'banner',
            );
        }

        if (image != null) {
            dataCreate.image_path = pathObj.path;
            dataCreate.thumbnail_path = pathObj.thumbPath;
        }

        const banner = await this.banner.create(dataCreate);

        this.response.message = 'Success Insert Banner Data';
        this.response.success = true;
        this.response.datum = banner;

        return this.response.toJson();
    }

    async findAll(req: Request) {
        const page = req.query.page == null ? 0 : Number(req.query.page) - 1;
        const limit = req.query.limit == null ? 10 : Number(req.query.limit);

        const filterData: any = {};
        if (req.query.name != undefined && req.query.name != '')
            filterData.name = {
                [Op.like]: `%${req.query.name}%`,
            };

        const categories = await this.banner.findAll({
            limit: limit,
            offset: page * limit,
            where: filterData,
        });

        if (categories.length == 0) {
            this.response.message = "No Data Found";
            this.response.success = false;

            return this.response.toJson();
        }

        this.response.message = 'Success Get Banner';
        this.response.success = true;
        this.response.data = categories;

        return this.response.toJson();
    }

    async findOne(id: string) {
        const categories = await this.banner.findOne({
            where: { id: id },
        });

        if (categories == null) {
            throw new NotFoundException('Not Data Found');
        }

        this.response.message = 'Success Get Banner';
        this.response.success = true;
        this.response.datum = categories;

        return this.response.toJson();
    }

    async update(id: string, updateBannerDto: UpdateBannerDto, image: Express.Multer.File,) {
        const dataUpdate: any = updateBannerDto;

        let pathObj = {} as PathImageObj;

        if (image != null) {
            //   pathName = `${this.pathImage + '/' + updateUserDto.userName}`;
            pathObj = await this.gen.uploadImage(
                image,
                `${dataUpdate.name}${Date.now()}`,
                'product',
            );
        }

        if (image != null) {
            dataUpdate.image_path = pathObj.path;
            dataUpdate.thumbnail_path = pathObj.thumbPath;
        }

        await this.banner.update(dataUpdate, { where: { id: id } });
        const menu = await this.banner.findOne({ where: { id: id } });

        this.response.message = 'Success Update Banner Data';
        this.response.success = true;
        this.response.datum = menu;

        return this.response.toJson();
    }

    async remove(id: string) {
        const banner = await this.banner.findOne({where:{id:id}});
        await this.banner.destroy({
            where: { id: id },
        });

        if (banner.image_path != '' || banner.image_path != null) {
            this.gen.removeImage(banner.image_path);
            this.gen.removeImage(banner.thumbnail_path);
        }

        this.response.message = 'Success Delete Banner Data';
        this.response.success = true;
        this.response.datum = null;

        return this.response.toJson();
    }
}

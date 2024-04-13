import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectModel } from '@nestjs/sequelize';
import { ResponseSuccess } from 'src/services/general/interfaces/response.dto';
import { Request } from 'express';
import { Op } from 'sequelize';
import { GeneralService } from 'src/services/general/general.service';
import { PathImageObj } from 'src/services/general/interfaces/path-image';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(Category)
        private category: typeof Category,
        private gen: GeneralService,
        private response: ResponseSuccess<Category>,
    ) {}

    /* RESPONSE SUCCES */
    async create(
        createCategoryDto: CreateCategoryDto,
        image: Express.Multer.File,
    ) {
        const dataCreate: any = createCategoryDto;
        let pathObj = {} as PathImageObj;

        if (image != null) {
            pathObj = await this.gen.uploadImage(
                image,
                `${dataCreate.name}${Date.now()}`,
                'category',
            );
        }

        if (image != null) {
            dataCreate.image_path = pathObj.path;
            dataCreate.thumbnail_path = pathObj.thumbPath;
        }

        const category = await this.category.create(dataCreate);

        this.response.message = 'Success Insert Category Data';
        this.response.success = true;
        this.response.datum = category;

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

        const categories = await this.category.findAll({
            limit: limit,
            offset: page * limit,
            where: filterData,
        });

        if (categories.length == 0) {
            this.response.message = "No Data Found";
            this.response.success = false;

            return this.response.toJson();
        }

        this.response.message = 'Success Get Category';
        this.response.success = true;
        this.response.data = categories;

        return this.response.toJson();
    }

    async findOne(id: string) {
        const categories = await this.category.findOne({
            where: { id: id },
        });

        if (categories == null) {
            throw new NotFoundException('Not Data Found');
        }

        this.response.message = 'Success Get Category';
        this.response.success = true;
        this.response.datum = categories;

        return this.response.toJson();
    }

    async update(
        id: string,
        updateCategoryDto: UpdateCategoryDto,
        image: Express.Multer.File,
    ) {
        const dataUpdate: any = updateCategoryDto;

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

        await this.category.update(dataUpdate, { where: { id: id } });
        const menu = await this.category.findOne({ where: { id: id } });

        this.response.message = 'Success Update Category Data';
        this.response.success = true;
        this.response.datum = menu;

        return this.response.toJson();
    }

    async remove(id: string) {
        const category = await this.category.findOne({where:{id:id}});
        await this.category.destroy({
            where: { id: id },
        });

        if (category.image_path != '' || category.image_path != null) {
            this.gen.removeImage(category.image_path);
            this.gen.removeImage(category.thumbnail_path);
        }

        this.response.message = 'Success Delete Category Data';
        this.response.success = true;
        this.response.datum = null;

        return this.response.toJson();
    }

    async getImage(id: string): Promise<Category> {
        const category = await this.category.findOne({
            where: { id: id },
        });
        return category;
    }
}

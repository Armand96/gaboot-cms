import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { Op } from 'sequelize';
import { PathImageObj } from 'src/services/general/interfaces/path-image';
import { GeneralService } from 'src/services/general/general.service';
import { ResponseSuccess } from 'src/services/general/interfaces/response.dto';
import { ProductImage } from './entities/product.image.entity';
import { Category } from 'src/mainapp/categories/entities/category.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product)
        private product: typeof Product,
        @InjectModel(ProductImage)
        private productImg: typeof ProductImage,
        private gen: GeneralService,
    ) {}

    private response: ResponseSuccess<Product> = new ResponseSuccess<Product>();

    async create(
        createProductDto: CreateProductDto,
    ) {
        let pathObj = {} as PathImageObj;

        const dataCreate: any = createProductDto;
        const product = await this.product.create(dataCreate);

        this.response.message = 'Success Insert Product Data';
        this.response.success = true;
        this.response.datum = product;

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

        const products = await this.product.findAll({
            limit: limit,
            offset: page * limit,
            where: filterData,
            include: Category
        });

        if (products?.length == 0) {
            this.response.message = "No Data Found";
            this.response.success = false;

            return this.response.toJson();
        }

        this.response.message = 'Success Get Products';
        this.response.success = true;
        this.response.data = products;

        return this.response.toJson();
    }

    async findOne(id: number) {
        const product = await this.product.findOne({
            where: { id: id },
        });

        if (product == null) throw new NotFoundException();

        this.response.message = 'Success Get Product';
        this.response.success = true;
        this.response.datum = product;

        return this.response.toJson();
    }

    async update(
        id: number,
        updateProductDto: UpdateProductDto,
        image: Express.Multer.File,
    ) {
        const dataUpdate: any = updateProductDto;

        let pathObj = {} as PathImageObj;

        if (image != null) {
            //   pathName = `${this.pathImage + '/' + updateUserDto.userName}`;
            pathObj = await this.gen.uploadImage(
                image,
                `${updateProductDto.name}${Date.now()}`,
                'product',
            );
        }

        if (image != null) {
            updateProductDto.imagePath = pathObj.path;
            updateProductDto.thumbnailPath = pathObj.thumbPath;
        }

        await this.product.update(dataUpdate, { where: { id: id } });
        const data = await this.product.findOne({ where: { id: id } });

        this.response.message = 'Success Update Product Data';
        this.response.success = true;
        this.response.datum = data;

        return this.response.toJson();
    }

    async remove(id: number) {
        await this.product.destroy({
            where: { id: id },
        });

        this.response.message = 'Success Delete Product Data';
        this.response.success = true;
        this.response.datum = null;

        return this.response.toJson();
    }

    async productImage(id: number): Promise<ProductImage> {
        const productImage = await this.productImg.findOne({
            where: { id: id },
        });

        if (!productImage) throw new NotFoundException('No Image Found');

        return productImage;
    }
}

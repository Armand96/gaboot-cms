import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
// import * as fs from 'fs';
// import { join } from 'path';

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
    private resProdImage: ResponseSuccess<ProductImage> = new ResponseSuccess<ProductImage>();

    async create(
        createProductDto: CreateProductDto,
    ) {
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

        const products = await this.product.findAndCountAll({
            limit: limit,
            offset: page * limit,
            where: filterData,
            include: Category
        });

        if (products?.rows.length == 0) {
            this.response.message = "No Data Found";
            this.response.success = false;

            return this.response.toJson();
        }

        const lastPage =
            Number((products.count / limit).toFixed(0)) +
            (products.count % limit == 0 ? 0 : 1);

        this.response.message = 'Success Get Products';
        this.response.success = true;
        this.response.data = products.rows;
        this.response.lastPage = lastPage;
        this.response.totalData = products.count;

        return this.response.toJson();
    }

    async findOne(id: string) {
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
        id: string,
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
            updateProductDto.image_path = pathObj.path;
            updateProductDto.thumbnail_path = pathObj.thumbPath;
        }

        await this.product.update(dataUpdate, { where: { id: id } });
        const data = await this.product.findOne({ where: { id: id } });

        this.response.message = 'Success Update Product Data';
        this.response.success = true;
        this.response.datum = data;

        return this.response.toJson();
    }

    async remove(id: string) {
        await this.product.destroy({
            where: { id: id },
        });

        this.response.message = 'Success Delete Product Data';
        this.response.success = true;
        this.response.datum = null;

        return this.response.toJson();
    }

    /* ====================================== PRODUCT IMAGES ====================================== */
    async getProductImages(productId: string) {
        const productImages = await this.productImg.findAll({where:{product_id:productId}});

        this.resProdImage.message = 'Success Get Product Images';
        this.resProdImage.success = true;
        this.resProdImage.data = productImages;

        return this.resProdImage.toJson();
    }

    async uploadImages(id: string, images: Express.Multer.File[]){
        const product = await this.product.findOne({
            where: { id: id },
        });

        const newImages: any = images;
        const dateNow = new Date();

        // console.log("PRINT IMAGES!!!", newImages);

        let productImages: any[] = [];

        try {
            if(!product) throw new NotFoundException();

            for (let index = 0; index < newImages.img.length; index++) {
                const image = newImages.img[index];
                
                let pathObj = {} as PathImageObj;
    
                pathObj = await this.gen.uploadImage(
                    image,
                    `${product.name}_${Date.now()}`,
                    'product',
                );
    
                const productImage:any = {
                    product_id: id,
                    image_path: pathObj.path,
                    thumbnail_path: pathObj.thumbPath,
                    createdAt: dateNow,
                }

                // console.log("DATA IMAGES", productImage);
                productImages.push(productImage);
            }

            const data = await this.productImg.bulkCreate(productImages);
            // console.log("HASIL UPLOAD: ",data);

            this.response.message = 'Success Upload Images';
            this.response.success = true;

            return this.response.toJson();
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('yahahah servernya error');
        }
    }

    async removeImages(idImage: string) {
        const productImage = await this.productImg.findOne({where:{id:idImage}});
        await this.productImg.destroy({where: {id:idImage}});
        this.gen.removeImage(productImage.image_path);
        this.gen.removeImage(productImage.thumbnail_path);

        this.response.message = 'Success Remove Image';
        this.response.success = true;

        return this.response.toJson();
    }

    async productImage(id: string): Promise<ProductImage> {
        const productImage = await this.productImg.findOne({
            where: { id: id },
        });

        if (!productImage) throw new NotFoundException('No Image Found');

        return productImage;
    }
}

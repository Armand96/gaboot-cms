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

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private product: typeof Product,
    private gen : GeneralService,
    private response : ResponseSuccess<Product>
  ) { }

  async create(createProductDto: CreateProductDto, image: Express.Multer.File) {
    let pathObj = {} as PathImageObj;

    if (image != null) {
      pathObj = await this.gen.uploadImage(
        image,
        `${createProductDto.name}${Date.now()}`,
        'product',
      );
      console.log('after upload');
    }

    if (image != null) {
      createProductDto.imagePath = pathObj.path;
      createProductDto.thumbnailPath = pathObj.thumbPath;
    }

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

    let filterData: any = {};
    if (req.query.name != undefined && req.query.name != "") filterData.name = {
      [Op.like]: `%${req.query.name}%`
    };
    
    const products = await this.product.findAll({
      limit: limit,
      offset: page * limit,
      where: filterData
    });

    if (products?.length == 0) throw new NotFoundException("No Data Found");
    
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
    image: Express.Multer.File) 
    {
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
}

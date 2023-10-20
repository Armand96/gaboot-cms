import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/sequelize';
import { ResponseSuccessProduct } from './interfaces/response-success-product';
import { Request } from 'express';
import { Op } from 'sequelize';
import { PathImageObj } from 'src/services/general/interfaces/path-image';
import { GeneralService } from 'src/services/general/general.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private product: typeof Product,
    private gen : GeneralService
  ) { }

  private resSuccess: ResponseSuccessProduct = {
    message: '',
    datum: <Product>{},
    data: <Product[]>[],
    success: false,
    lastPage: 0,
    totalData: 0
  };

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

    this.resSuccess.message = 'Success Insert Product Data';
    this.resSuccess.success = true;
    this.resSuccess.datum = product;

    return this.resSuccess;
  }

  async findAll(req: Request) {
    const page = req.query.page == null ? 0 : Number(req.query.page) - 1;
    const limit = req.query.limit == null ? 10 : Number(req.query.limit);


    /* FILTER DATA */
    // console.log(req.query)
    let filterData: any = {};
    if (req.query.name != undefined && req.query.name != "") filterData.name = {
      [Op.like]: `%${req.query.name}%`
    };
    
    const categories = await this.product.findAll({
      limit: limit,
      offset: page * limit,
      where: filterData
    });

    this.resSuccess.message = 'Success Get Product';
    this.resSuccess.success = true;
    this.resSuccess.data = categories;

    return this.resSuccess;
  }

  async findOne(id: number) {
    const categories = await this.product.findOne({
      where: { id: id },
    });

    this.resSuccess.message = 'Success Get Product';
    this.resSuccess.success = true;
    this.resSuccess.datum = categories;
    delete this.resSuccess.lastPage;

    return this.resSuccess;
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

    this.resSuccess.message = 'Success Update Product Data';
    this.resSuccess.success = true;
    this.resSuccess.datum = data;

    return this.resSuccess;
  }

  async remove(id: number) {
    await this.product.destroy({
      where: { id: id },
    });

    this.resSuccess.message = 'Success Delete Product Data';
    this.resSuccess.success = true;
    this.resSuccess.datum = null;

    return this.resSuccess;
  }
}

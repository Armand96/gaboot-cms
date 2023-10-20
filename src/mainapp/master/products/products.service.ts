import { Injectable } from '@nestjs/common';
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
    private gen : GeneralService
  ) { }

  async create(createProductDto: CreateProductDto, image: Express.Multer.File) {
    const resSuccess = new ResponseSuccess<Product>();
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

    resSuccess.message = 'Success Insert Product Data';
    resSuccess.success = true;
    resSuccess.datum = product;

    return resSuccess;
  }

  async findAll(req: Request) {
    const resSuccess = new ResponseSuccess<Product>();
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

    resSuccess.message = 'Success Get Product';
    resSuccess.success = true;
    resSuccess.data = categories;

    return resSuccess;
  }

  async findOne(id: number) {
    const resSuccess = new ResponseSuccess<Product>();
    const categories = await this.product.findOne({
      where: { id: id },
    });

    resSuccess.message = 'Success Get Product';
    resSuccess.success = true;
    resSuccess.datum = categories;
    delete resSuccess.lastPage;

    return resSuccess;
  }

  async update(
    id: number, 
    updateProductDto: UpdateProductDto, 
    image: Express.Multer.File) 
    {
      const resSuccess = new ResponseSuccess<Product>();
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

    resSuccess.message = 'Success Update Product Data';
    resSuccess.success = true;
    resSuccess.datum = data;

    return resSuccess;
  }

  async remove(id: number) {
    const resSuccess = new ResponseSuccess<Product>();
    await this.product.destroy({
      where: { id: id },
    });

    resSuccess.message = 'Success Delete Product Data';
    resSuccess.success = true;
    resSuccess.datum = null;

    return resSuccess;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectModel } from '@nestjs/sequelize';
import { ResponseSuccessCategory } from './interfaces/response-success-category';
import { Request } from 'express';
import { Op } from 'sequelize';
import { GeneralService } from 'src/services/general/general.service';
import { PathImageObj } from 'src/services/general/interfaces/path-image';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category)
    private category: typeof Category,
    private gen : GeneralService
  ) { }

  /* RESPONSE SUCCES */
  private resSuccess: ResponseSuccessCategory = {
    message: '',
    datum: <Category>{},
    data: <Category[]>[],
    success: false,
    lastPage: 0,
    totalData: 0
  };

  async create(createCategoryDto: CreateCategoryDto, 
    image: Express.Multer.File) {
    let dataCreate: any = createCategoryDto;
    let pathObj = {} as PathImageObj;

    if (image != null) {
      pathObj = await this.gen.uploadImage(
        image,
        `${dataCreate.name}${Date.now()}`,
        'category',
      );
    }

    if (image != null) {
      dataCreate.imagePath = pathObj.path;
      dataCreate.thumbnailPath = pathObj.thumbPath;
    }
    
    const category = await this.category.create(dataCreate);

    this.resSuccess.message = 'Success Insert Category Data';
    this.resSuccess.success = true;
    this.resSuccess.datum = category;
    
    return this.resSuccess;
  }

  async findAll(req : Request) {
    const page = req.query.page == null ? 0 : Number(req.query.page) - 1;
    const limit = req.query.limit == null ? 10 : Number(req.query.limit);
    /* FILTER DATA */
    // console.log(req.query)
    let filterData: any = {};
    if (req.query.name != undefined && req.query.name != "") filterData.name = {
      [Op.like]: `%${req.query.name}%`
    };
    
    const categories = await this.category.findAll({
      limit: limit,
      offset: page * limit,
      where: filterData
    });

    this.resSuccess.message = 'Success Get Category';
    this.resSuccess.success = true;
    this.resSuccess.data = categories;

    return this.resSuccess;
  }

  async findOne(id: number) {
    const categories = await this.category.findOne({
      where: { id: id },
    });

    this.resSuccess.message = 'Success Get product';
    this.resSuccess.success = true;
    this.resSuccess.datum = categories;
    delete this.resSuccess.lastPage;

    return this.resSuccess;
  }

  async update(id: number, 
    updateCategoryDto: UpdateCategoryDto,
    image: Express.Multer.File) 
    {
    let dataUpdate: any = updateCategoryDto;

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
      dataUpdate.imagePath = pathObj.path;
      dataUpdate.thumbnailPath = pathObj.thumbPath;
    }

    await this.category.update(dataUpdate, { where: { id: id } });
    const menu = await this.category.findOne({ where: { id: id } });

    this.resSuccess.message = 'Success Update Category Data';
    this.resSuccess.success = true;
    this.resSuccess.datum = menu;

    return this.resSuccess;
  }

  async remove(id: number) {
    await this.category.destroy({
      where: { id: id },
    });

    this.resSuccess.message = 'Success Delete Category Data';
    this.resSuccess.success = true;
    this.resSuccess.datum = null;

    return this.resSuccess;
  }

  async getImage(id: number): Promise<Category> {
    console.log('image');
    const category = await this.category.findOne({
      where: { id: id },
    });
    return category;
  }
}

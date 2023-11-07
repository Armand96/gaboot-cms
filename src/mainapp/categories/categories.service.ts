import { Injectable } from '@nestjs/common';
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
    private gen : GeneralService,
    private response : ResponseSuccess<Category>
  ) { }

  /* RESPONSE SUCCES */
  async create(createCategoryDto: CreateCategoryDto, 
    image: Express.Multer.File) 
    {
    const resSuccess = new ResponseSuccess<Category>();
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

    resSuccess.message = 'Success Insert Category Data';
    resSuccess.success = true;
    resSuccess.datum = category;
    
    return resSuccess;
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

    this.response.message = 'Success Get Category';
    this.response.success = true;
    this.response.data = categories;

    return this.response;
  }

  async findOne(id: number) {
    const categories = await this.category.findOne({
      where: { id: id },
    });

    this.response.message = 'Success Get product';
    this.response.success = true;
    this.response.datum = categories;

    return this.response;
  }

  async update(id: number, 
    updateCategoryDto: UpdateCategoryDto,
    image: Express.Multer.File) 
    {
      const resSuccess = new ResponseSuccess<Category>();
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

    resSuccess.message = 'Success Update Category Data';
    resSuccess.success = true;
    resSuccess.datum = menu;

    return resSuccess;
  }

  async remove(id: number) {
    const resSuccess = new ResponseSuccess<Category>();
    await this.category.destroy({
      where: { id: id },
    });

    resSuccess.message = 'Success Delete Category Data';
    resSuccess.success = true;
    resSuccess.datum = null;

    return resSuccess;
  }

  async getImage(id: number): Promise<Category> {
    const category = await this.category.findOne({
      where: { id: id },
    });
    return category;
  }
}

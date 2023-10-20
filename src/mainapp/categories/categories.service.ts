import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectModel } from '@nestjs/sequelize';
import { ResponseSuccessCategory } from './interfaces/response-success-category';
import { Request } from 'express';
import { Op } from 'sequelize';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category)
    private category: typeof Category,
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

  async create(createCategoryDto: CreateCategoryDto) {
    let dataCreate: any = createCategoryDto;
    
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

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    let dataUpdate: any = {};
    dataUpdate.name = updateCategoryDto.name;
    dataUpdate.description = updateCategoryDto.description;
    dataUpdate.imagePath = updateCategoryDto.imagePath;
    dataUpdate.thumbnailPath = updateCategoryDto.thumbnailPath;

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
}

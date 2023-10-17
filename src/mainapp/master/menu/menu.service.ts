import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
// import { Request } from 'express';
import { Submenu } from '../submenu/entities/submenu.entity';
import { ResponseSuccessMenu } from './interfaces/response-success-menu';
import { Request } from 'express';
import { Op } from 'sequelize';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menu)
    private menu: typeof Menu,
  ) { }

  /* RESPONSE SUCCES */
  private resSuccess: ResponseSuccessMenu = {
    message: '',
    datum: <Menu>{},
    data: <Menu[]>[],
    success: false,
    lastPage: 0,
    totalData: 0
  };

  async create(createMenuDto: CreateMenuDto) {
    let dataCreate: any = {};
    dataCreate.menuName = createMenuDto.menuName;
    dataCreate.menuIcon = createMenuDto.menuIcon;
    dataCreate.backendUrl = createMenuDto.backendUrl;
    dataCreate.frontendUrl = createMenuDto.frontendUrl;
    dataCreate.menuHaveChild = createMenuDto.menuHaveChild;
    dataCreate.menuIsActive = createMenuDto.menuIsActive;

    console.log(createMenuDto);
    const menu = await this.menu.create(dataCreate);

    this.resSuccess.message = 'Success Insert Menu Data';
    this.resSuccess.success = true;
    this.resSuccess.datum = menu;

    return this.resSuccess;
  }

  async findAll(req: Request) {

    const page = req.query.page == null ? 0 : Number(req.query.page) - 1;
    const limit = req.query.limit == null ? 10 : Number(req.query.limit);


    /* FILTER DATA */
    // console.log(req.query)
    let filterData: any = {};
    if (req.query.roleName != undefined && req.query.roleName != "") filterData.roleName = {
      [Op.like]: `%${req.query.roleName}%`
    };

    const dataMenu = await this.menu.findAll({
      include: [Submenu],
      limit: limit,
      offset: page * limit,
      where: filterData
    });

    this.resSuccess.message = 'Success Get Menus';
    this.resSuccess.success = true;
    this.resSuccess.data = dataMenu;

    return this.resSuccess;
  }

  async findOne(id: number) {
    const dataMenu = await this.menu.findOne({
      where: { id: id },
      include: [Submenu],
    });
    this.resSuccess.message = 'Success Get Menu';
    this.resSuccess.success = true;
    this.resSuccess.datum = dataMenu;
    delete this.resSuccess.lastPage;

    return this.resSuccess;
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    let dataUpdate: any = {};
    dataUpdate.menuName = updateMenuDto.menuName;
    dataUpdate.menuIcon = updateMenuDto.menuIcon;
    dataUpdate.backendUrl = updateMenuDto.backendUrl;
    dataUpdate.frontendUrl = updateMenuDto.frontendUrl;
    dataUpdate.menuHaveChild = updateMenuDto.menuHaveChild;
    dataUpdate.menuIsActive = updateMenuDto.menuIsActive;

    await this.menu.update(dataUpdate, { where: { id: id } });
    const menu = await this.menu.findOne({ where: { id: id } });

    this.resSuccess.message = 'Success Update Menu Data';
    this.resSuccess.success = true;
    this.resSuccess.datum = menu;

    return this.resSuccess;
  }

  async remove(id: number) {
    await this.menu.destroy({
      where: { id: id },
    });

    this.resSuccess.message = 'Success Delete Menu Data';
    this.resSuccess.success = true;
    this.resSuccess.datum = null;

    return this.resSuccess;
  }
}

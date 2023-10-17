import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { CreateSubmenuDto } from './dto/create-submenu.dto';
import { UpdateSubmenuDto } from './dto/update-submenu.dto';
import { Submenu } from './entities/submenu.entity';
import { ResponseSuccessSubmenu } from './interfaces/response-success-submenu';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { RoleSubmenuService } from 'src/mainapp/access/role_submenu/role_submenu.service';

@Injectable()
export class SubmenuService {
  constructor(
    @InjectModel(Submenu)
    private submenu: typeof Submenu,
    private seq: Sequelize,
    private roleSubmSvc: RoleSubmenuService,
  ) { }

  /* RESPONSE SUCCES */
  private resSuccess = {} as ResponseSuccessSubmenu;

  async create(createSubmenuDto: CreateSubmenuDto) {
    let dataCreate: any = {};
    dataCreate.menuId = createSubmenuDto.menuId;
    dataCreate.submenuName = createSubmenuDto.submenuName;
    dataCreate.submenuIcon = createSubmenuDto.submenuIcon;
    dataCreate.backendUrl = createSubmenuDto.backendUrl;
    dataCreate.frontendUrl = createSubmenuDto.frontendUrl;
    dataCreate.submenuIsActive = createSubmenuDto.submenuIsActive;

    const submenu = await this.submenu.create(dataCreate);

    this.resSuccess.message = 'Success Insert Submenu Data';
    this.resSuccess.success = true;
    this.resSuccess.datum = submenu;
    delete this.resSuccess.lastPage;

    return this.resSuccess;
  }

  async findAll(req: Request) {
    const page = req.query.page == null ? 0 : Number(req.query.page) - 1;
    const limit = req.query.limit == null ? 10 : Number(req.query.limit);

    /* FILTER DATA */
    // console.log(req.query)
    let filterData: any = {};
    if (req.query.submenuName != undefined && req.query.submenuName != "") filterData.submenuName = {
      [Op.like]: `%${req.query.submenuName}%`
    };

    const dataSubmenu = await this.submenu.findAndCountAll({
      limit: limit,
      offset: page * limit,
      where: filterData
    });

    const lastPage =
      Number((dataSubmenu.count / limit).toFixed(0)) +
      (dataSubmenu.count % limit == 0 ? 0 : 1);
    this.resSuccess.message = 'Success Get Submenus';
    this.resSuccess.success = true;
    this.resSuccess.data = dataSubmenu.rows;
    this.resSuccess.lastPage = lastPage;

    return this.resSuccess;
  }

  async findByMenuId(menuId: number) {
    const dataSubmenu = await this.submenu.findAll({ where: { menuId: menuId } })
    this.resSuccess.message = 'Success Get Submenus';
    this.resSuccess.success = true;
    this.resSuccess.data = dataSubmenu;
    return this.resSuccess;
  }

  async findOne(id: number) {
    const dataSubmenu = await this.submenu.findOne({ where: { id: id } });
    this.resSuccess.message = 'Success Get Submenu';
    this.resSuccess.success = true;
    this.resSuccess.datum = dataSubmenu;
    delete this.resSuccess.lastPage;

    return this.resSuccess;
  }

  async update(id: number, updateSubmenuDto: UpdateSubmenuDto) {
    let dataUpdate: any = {};
    dataUpdate.menuId = updateSubmenuDto.menuId;
    dataUpdate.submenuName = updateSubmenuDto.submenuName;
    dataUpdate.submenuIcon = updateSubmenuDto.submenuIcon;
    dataUpdate.backendUrl = updateSubmenuDto.backendUrl;
    dataUpdate.frontendUrl = updateSubmenuDto.frontendUrl;
    dataUpdate.submenuIsActive = updateSubmenuDto.submenuIsActive;

    await this.submenu.update(dataUpdate, { where: { id: id } });
    const submenu = await this.submenu.findOne({ where: { id: id } });

    this.resSuccess.message = 'Success Update Submenu Data';
    this.resSuccess.success = true;
    this.resSuccess.datum = submenu;
    delete this.resSuccess.lastPage;

    return this.resSuccess;
  }

  async remove(id: number) {

    await this.seq.transaction(async (trx) => {

      await this.submenu.destroy({
        where: { id: id },
      });

      await this.roleSubmSvc.deleteBySubmenuId(id);
    })


    this.resSuccess.message = 'Success Delete Submenu Data';
    this.resSuccess.success = true;
    this.resSuccess.datum = null;
    delete this.resSuccess.lastPage;

    return this.resSuccess;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateRoleMenuDto } from './dto/create-role_menu.dto';
import { UpdateRoleMenuDto } from './dto/update-role_menu.dto';
import { RoleMenu } from './entities/role_menu.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';

@Injectable()
export class RoleMenuService {
  constructor(
    @InjectModel(RoleMenu)
    private roleMenu: typeof RoleMenu,
  ) { }

  /* RESPONSE SUCCES */
  private resSuccess: any = {
    message: '',
    data: <RoleMenu[]>[] || <RoleMenu>{},
    success: false,
  };

  async create(createRoleMenuDto: CreateRoleMenuDto) {
    let dataCreate: any = {};
    dataCreate.roleId = createRoleMenuDto.roleId;
    dataCreate.menuId = createRoleMenuDto.menuId;

    const roleMenu = await this.roleMenu.create(dataCreate);

    this.resSuccess.message = 'Success Insert Role Menu Data';
    this.resSuccess.success = true;
    this.resSuccess.data = roleMenu;
    delete this.resSuccess.lastPage;

    return this.resSuccess;
  }

  async findAll(req: Request) {
    const page = req.query.page == null ? 0 : Number(req.query.page) - 1;
    const limit = req.query.limit == null ? 10 : Number(req.query.limit);

    const dataRoleMenu = await this.roleMenu.findAndCountAll({
      limit: limit,
      offset: page * limit,
    });

    const lastPage =
      Number((dataRoleMenu.count / limit).toFixed(0)) +
      (dataRoleMenu.count % limit == 0 ? 0 : 1);
    this.resSuccess.message = 'Success Get Role Menus';
    this.resSuccess.success = true;
    this.resSuccess.data = dataRoleMenu.rows;
    this.resSuccess.lastPage = lastPage;

    return this.resSuccess;
  }

  async findOne(id: number) {
    let dataRoleMenu = await this.roleMenu.findOne({ where: { id: id } });
    this.resSuccess.message = 'Success Get Role Menu';
    this.resSuccess.success = true;
    this.resSuccess.data = dataRoleMenu;
    delete this.resSuccess.lastPage;

    return this.resSuccess;
  }

  async update(id: number, updateRoleMenuDto: UpdateRoleMenuDto) {
    let dataUpdate: any = {};
    dataUpdate.roleId = updateRoleMenuDto.roleId;
    dataUpdate.menuId = updateRoleMenuDto.menuId;

    await this.roleMenu.update(dataUpdate, { where: { id: id } });
    const roleMenu = await this.roleMenu.findOne({ where: { id: id } });

    this.resSuccess.message = 'Success Update Role Menu Data';
    this.resSuccess.success = true;
    this.resSuccess.data = roleMenu;
    delete this.resSuccess.lastPage;

    return this.resSuccess;
  }

  async remove(id: number) {
    await this.roleMenu.destroy({
      where: { id: id },
    });

    this.resSuccess.message = 'Success Delete Role Menu Data';
    this.resSuccess.success = true;
    this.resSuccess.data = null;
    delete this.resSuccess.lastPage;

    return this.resSuccess;
  }

  /* NON CRUD */
  assignData(datas: CreateRoleMenuDto) {
    let dataCreate: any = {};
    dataCreate.roleId = datas.roleId;
    dataCreate.menuId = datas.menuId;
    return dataCreate;
  }

  async bulkInsert(rolemArray: CreateRoleMenuDto[]) {
    let dataCreate = [];
    rolemArray.forEach((element) => {
      const temp = this.assignData(element);
      dataCreate.push(temp);
    });

    const roleMenu = await this.roleMenu.bulkCreate(dataCreate);

    this.resSuccess.message = 'Success Insert Menu Access Data';
    this.resSuccess.success = true;
    this.resSuccess.data = roleMenu;
    delete this.resSuccess.lastPage;

    return this.resSuccess;
  }

  async bulkDelete(roleId: number) {
    await this.roleMenu.destroy({
      where: { roleId: roleId },
    });
  }
}

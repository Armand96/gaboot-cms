import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
// import { User } from 'src/master/user/entities/user.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { CreateRoleDetailDto } from './dto/create-role-detail.dto';
import { Sequelize } from 'sequelize-typescript';
import { wsLogger } from 'src/config/winstonlogger';
// import { error } from 'winston';
// import { CreateRoleMenuDto } from 'src/access/role_menu/dto/create-role_menu.dto';
// import { CreateRoleSubmenuDto } from 'src/access/role_submenu/dto/create-role_submenu.dto';
import { ResponseSuccessRole } from './interfaces/response-success-role';
import { Menu } from '../menu/entities/menu.entity';
import { Submenu } from '../submenu/entities/submenu.entity';
// import { RoleAccess } from 'src/access/role_access/entities/role_access.entity';
import { MenuService } from '../menu/menu.service';
import { SubmenuService } from '../submenu/submenu.service';
import { UpdateRoleDetailDto } from './dto/update-role-detail.dto';
import { Op } from 'sequelize';
import { CreateRoleAccessDto } from 'src/mainapp/access/role_access/dto/create-role_access.dto';
import { RoleAccess } from 'src/mainapp/access/role_access/entities/role_access.entity';
import { RoleAccessService } from 'src/mainapp/access/role_access/role_access.service';
import { RoleMenu } from 'src/mainapp/access/role_menu/entities/role_menu.entity';
import { RoleMenuService } from 'src/mainapp/access/role_menu/role_menu.service';
import { CreateRoleSubmenuDto } from 'src/mainapp/access/role_submenu/dto/create-role_submenu.dto';
import { RoleSubmenu } from 'src/mainapp/access/role_submenu/entities/role_submenu.entity';
import { RoleSubmenuService } from 'src/mainapp/access/role_submenu/role_submenu.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role)
    private role: typeof Role,
    private rolac: RoleAccessService,
    private roleMenu: RoleMenuService,
    private roleSubmenu: RoleSubmenuService,
    private menuSvc: MenuService,
    private submenuSvc: SubmenuService,
    private seq: Sequelize,
  ) { }

  wslog = wsLogger;

  /* RESPONSE SUCCES */
  private resSuccess: ResponseSuccessRole = {
    message: '',
    datum: <Role>{},
    data: <Role[]>[],
    success: false,
    lastPage: 0,
    totalData: 0
  };

  async create(createRoleDto: CreateRoleDto) {
    let dataCreate: any = {};
    dataCreate.roleName = createRoleDto.roleName;
    const role = await this.role.create(dataCreate);

    this.resSuccess.message = 'Success Insert Role Data';
    this.resSuccess.success = true;
    this.resSuccess.datum = role;

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

    const includes =
      req.query.includes == null || req.query.includes == '0'
        ? []
        : [
          {
            model: RoleMenu,
            required: true,
            include: [RoleSubmenu],
          },
        ];

    const dataRole = await this.role.findAndCountAll({
      limit: limit,
      offset: page * limit,
      include: includes,
      where: filterData
    });

    const lastPage =
      Number((dataRole.count / limit).toFixed(0)) +
      (dataRole.count % limit == 0 ? 0 : 1);
    this.resSuccess.message = 'Success Get Roles';
    this.resSuccess.success = true;
    this.resSuccess.data = dataRole.rows;
    this.resSuccess.lastPage = lastPage;

    return this.resSuccess;
  }

  async findOne(id: number) {
    const dataRole = await this.role.findOne({
      where: { id: id },
      include: [
        {
          model: RoleMenu,
          required: true,
          include: [
            {
              model: Menu,
              include: [{
                model: RoleAccess,
                where: { submenuId: null }
              }]
            },
            {
              model: RoleSubmenu,
              include: [{
                model: Submenu,
                include: [RoleAccess]
              }],
            },
          ],
        },
      ],
    });
    this.resSuccess.message = 'Success Get Role';
    this.resSuccess.success = true;
    this.resSuccess.datum = dataRole;

    return this.resSuccess;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    let dataUpdate: any = {};
    dataUpdate.roleName = updateRoleDto.roleName;

    await this.role.update(dataUpdate, {
      where: { id: id },
    });

    const role = await this.role.findOne({ where: { id: id } });
    this.resSuccess.message = 'Success Update Role Data';
    this.resSuccess.success = true;
    this.resSuccess.datum = role;

    return this.resSuccess;
  }

  async remove(id: number) {
    await this.role.destroy({
      where: { id: id },
    });
    await this.rolac.bulkDelete(id);
    await this.roleMenu.bulkDelete(id);
    await this.roleSubmenu.bulkDelete(id);

    this.resSuccess.message = 'Success Delete Role Data';
    this.resSuccess.success = true;
    this.resSuccess.datum = null;

    return this.resSuccess;
  }

  /* ========================== NON CRUD ========================== */
  async findByRoleName(roleName: string) {
    return await this.role.findOne({ where: { roleName: roleName } });
  }

  throwingError(error: Error) {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'Server Error',
      },
      HttpStatus.FORBIDDEN,
      {
        cause: error,
      },
    );
  }

  /* CREATE ROLE */
  async createNewRole(createRoleDto: CreateRoleDetailDto) {
    let dataArrayRoleAccess: CreateRoleAccessDto[] = [];
    let dataRoleSubmenu: CreateRoleSubmenuDto[] = [];
    let dataArrayMenu = createRoleDto.roleMenus;

    const roleDto: CreateRoleDto = {
      roleName: createRoleDto.roleName,
    };

    try {
      await this.seq.transaction(async () => {
        const data: ResponseSuccessRole = await this.create(roleDto);
        const id: number = data.datum.id;

        /* INSERT TO ROLE MENUS AND SUBMENUS */
        for (let index = 0; index < dataArrayMenu.length; index++) {
          const element = dataArrayMenu[index];
          let tempDataRoleAccess = {} as CreateRoleAccessDto;

          /* CHECK ENABLED OR DISABLED */
          if (element.isChecked) {
            let menuHaveChild = await this.menuSvc.findOne(element.menuId);
            if (!menuHaveChild.datum.menuHaveChild) {
              tempDataRoleAccess = {
                roleId: id,
                menuId: element.menuId,
                submenuId: null,
                frontendUrl: menuHaveChild.datum.frontendUrl,
                backendUrl: menuHaveChild.datum.backendUrl,
                create: element.create,
                read: element.read,
                updates: element.updates,
                delete: element.delete,
              };

              dataArrayRoleAccess.push(tempDataRoleAccess);
            }

            element.roleId = id;
            let resp = await this.roleMenu.create(element);

            for (let index = 0; index < element.roleSubmenus.length; index++) {
              const elm2 = element.roleSubmenus[index];

              /* CHECK ENABLED OR DISABLED */
              if (elm2.isChecked) {
                (elm2.roleId = id), (elm2.roleMenuId = resp.data.id);
                let dataSubmenu = await this.submenuSvc.findOne(elm2.submenuId);

                tempDataRoleAccess = {
                  roleId: id,
                  menuId: element.menuId,
                  submenuId: elm2.submenuId,
                  frontendUrl: dataSubmenu.datum.frontendUrl,
                  backendUrl: dataSubmenu.datum.backendUrl,
                  create: elm2.create,
                  read: elm2.read,
                  updates: elm2.updates,
                  delete: elm2.delete,
                } as CreateRoleAccessDto;
                dataArrayRoleAccess.push(tempDataRoleAccess);
                dataRoleSubmenu.push(elm2);
              }

            }

          }

        }
        await this.roleSubmenu.bulkInsert(dataRoleSubmenu);

        // roleSubmenus.forEach(element => {
        //     element.roleId = id;
        // });

        /* INSERT */
        await this.rolac.bulkInsert(dataArrayRoleAccess);
        this.resSuccess = await this.findOne(id);
        this.resSuccess.message = 'Success Create Role';
      });

      return this.resSuccess;
    } catch (error) {
      this.wslog.error(error);
      this.throwingError(error);
    }
  }

  /* UPDATE */
  /* ===================================================================== */
  async updateRole(roleId: number, updateRoleDto: UpdateRoleDetailDto) {
    let dataArrayRoleAccess: CreateRoleAccessDto[] = [];
    let dataRoleSubmenu: CreateRoleSubmenuDto[] = [];
    let dataArrayMenu = updateRoleDto.roleMenus;

    const roleDto: UpdateRoleDto = {
      roleName: updateRoleDto.roleName,
    };

    try {
      await this.seq.transaction(async () => {
        await this.update(roleId, roleDto);

        // dataArrayRole.forEach((element) => {
        //     element.roleId = roleId;
        // });

        /* DELETE */
        await this.rolac.bulkDelete(roleId);
        await this.roleMenu.bulkDelete(roleId);
        await this.roleSubmenu.bulkDelete(roleId);

        /* INSERT TO ROLE MENUS AND SUBMENUS */
        for (let index = 0; index < dataArrayMenu.length; index++) {
          const element = dataArrayMenu[index];
          element.roleId = roleId;

          /* CHECK ENABLED OR DISABLED */
          if (element.isChecked) {
            let tempDataRoleAccess = {} as CreateRoleAccessDto;

            let menuHaveChild = await this.menuSvc.findOne(element.menuId);
            if (!menuHaveChild.datum.menuHaveChild) {
              tempDataRoleAccess = {
                roleId: roleId,
                menuId: element.menuId,
                submenuId: null,
                frontendUrl: menuHaveChild.datum.frontendUrl,
                backendUrl: menuHaveChild.datum.backendUrl,
                create: element.create,
                read: element.read,
                updates: element.updates,
                delete: element.delete,
              };

              dataArrayRoleAccess.push(tempDataRoleAccess);
            }

            let resp = await this.roleMenu.create(element);

            for (let index = 0; index < element.roleSubmenus.length; index++) {
              const elm2 = element.roleSubmenus[index];

              if (elm2.isChecked) {
                (elm2.roleId = roleId), (elm2.roleMenuId = resp.data.id);
                let dataSubmenu = await this.submenuSvc.findOne(elm2.submenuId);

                tempDataRoleAccess = {
                  roleId: roleId,
                  menuId: element.menuId,
                  submenuId: elm2.submenuId,
                  frontendUrl: dataSubmenu.datum.frontendUrl,
                  backendUrl: dataSubmenu.datum.backendUrl,
                  create: elm2.create,
                  read: elm2.read,
                  updates: elm2.updates,
                  delete: elm2.delete,
                };

                dataArrayRoleAccess.push(tempDataRoleAccess);
                dataRoleSubmenu.push(elm2);
              }
            }

          }

        }

        /* INSERT */
        await this.roleSubmenu.bulkInsert(dataRoleSubmenu);
        await this.rolac.bulkInsert(dataArrayRoleAccess);
        this.resSuccess = await this.findOne(roleId);
        this.resSuccess.message = 'Success Update Role';
      });
      return this.resSuccess;
    } catch (error) {
      this.wslog.error(error);
      this.throwingError(error);
    }
  }
}

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
import { ResponseSuccess } from 'src/services/general/interfaces/response.dto';

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
    ) {}

    wslog = wsLogger;

    async create(createRoleDto: CreateRoleDto) {
        const resSuccess = new ResponseSuccess<Role>();
        const dataCreate: any = createRoleDto;
        const role = await this.role.create(dataCreate);

        resSuccess.message = 'Success Insert Role Data';
        resSuccess.success = true;
        resSuccess.datum = role;

        return resSuccess;
    }

    async findAll(req: Request) {
        const resSuccess = new ResponseSuccess<Role>();
        const page = req.query.page == null ? 0 : Number(req.query.page) - 1;
        const limit = req.query.limit == null ? 10 : Number(req.query.limit);

        /* FILTER DATA */
        // console.log(req.query)
        const filterData: any = {};
        if (req.query.role_name != undefined && req.query.role_name != '')
            filterData.role_name = {
                [Op.like]: `%${req.query.role_name}%`,
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
            where: filterData,
        });

        const lastPage =
            Number((dataRole.count / limit).toFixed(0)) +
            (dataRole.count % limit == 0 ? 0 : 1);
        resSuccess.message = 'Success Get Roles';
        resSuccess.success = true;
        resSuccess.data = dataRole.rows;
        resSuccess.lastPage = lastPage;

        return resSuccess;
    }

    async findOne(id: string) {
        const resSuccess = new ResponseSuccess<Role>();
        const dataRole = await this.role.findOne({
            where: { id: id },
            include: [
                {
                    model: RoleMenu,
                    required: true,
                    include: [
                        {
                            model: Menu,
                            include: [
                                {
                                    model: RoleAccess,
                                    where: { submenu_id: null },
                                },
                            ],
                        },
                        {
                            model: RoleSubmenu,
                            include: [
                                {
                                    model: Submenu,
                                    include: [RoleAccess],
                                },
                            ],
                        },
                    ],
                },
            ],
        });
        resSuccess.message = 'Success Get Role';
        resSuccess.success = true;
        resSuccess.datum = dataRole;

        return resSuccess;
    }

    async update(id: string, updateRoleDto: UpdateRoleDto) {
        const resSuccess = new ResponseSuccess<Role>();
        const dataUpdate: any = {};
        dataUpdate.role_name = updateRoleDto.role_name;

        await this.role.update(dataUpdate, {
            where: { id: id },
        });

        const role = await this.role.findOne({ where: { id: id } });
        resSuccess.message = 'Success Update Role Data';
        resSuccess.success = true;
        resSuccess.datum = role;

        return resSuccess;
    }

    async remove(id: string) {
        const resSuccess = new ResponseSuccess<Role>();
        await this.role.destroy({
            where: { id: id },
            cascade: false
        });
        await this.rolac.bulkDelete(id);
        await this.roleMenu.bulkDelete(id);
        await this.roleSubmenu.bulkDelete(id);

        resSuccess.message = 'Success Delete Role Data';
        resSuccess.success = true;
        resSuccess.datum = null;

        return resSuccess;
    }

    /* ========================== NON CRUD ========================== */
    async findByRoleName(role_name: string) {
        return await this.role.findOne({ where: { role_name: role_name } });
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
        let resSuccess = new ResponseSuccess<Role>();
        const dataArrayRoleAccess: CreateRoleAccessDto[] = [];
        const dataRoleSubmenu: CreateRoleSubmenuDto[] = [];
        const dataArrayMenu = createRoleDto.role_menus;

        const roleDto: CreateRoleDto = {
            role_name: createRoleDto.role_name,
        };

        try {
            await this.seq.transaction(async () => {
                const data: ResponseSuccessRole = await this.create(roleDto);
                const id: string = data.datum.id;

                /* INSERT TO ROLE MENUS AND SUBMENUS */
                for (let index = 0; index < dataArrayMenu.length; index++) {
                    const element = dataArrayMenu[index];
                    let tempDataRoleAccess = {} as CreateRoleAccessDto;

                    /* CHECK ENABLED OR DISABLED */
                    if (element.is_checked) {
                        const menuHaveChild = await this.menuSvc.findOne(
                            element.menu_id,
                        );
                        if (!menuHaveChild.datum.menu_have_child) {
                            tempDataRoleAccess = {
                                role_id: id,
                                menu_id: element.menu_id,
                                submenu_id: null,
                                frontend_url: menuHaveChild.datum.frontend_url,
                                backend_url: menuHaveChild.datum.backend_url,
                                create_access: element.create_access,
                                read_access: element.read_access,
                                update_access: element.update_access,
                                delete_access: element.delete_access,
                            };

                            dataArrayRoleAccess.push(tempDataRoleAccess);
                        }

                        element.role_id = id;
                        const resp = await this.roleMenu.create(element);

                        for (
                            let index = 0;
                            index < element.role_submenus.length;
                            index++
                        ) {
                            const elm2 = element.role_submenus[index];

                            /* CHECK ENABLED OR DISABLED */
                            if (elm2.is_checked) {
                                (elm2.role_id = id),
                                    (elm2.rolemenu_id = resp.data.id);
                                const dataSubmenu =
                                    await this.submenuSvc.findOne(
                                        elm2.submenu_id,
                                    );

                                tempDataRoleAccess = {
                                    role_id: id,
                                    menu_id: element.menu_id,
                                    submenu_id: elm2.submenu_id,
                                    frontend_url: dataSubmenu.datum.frontend_url,
                                    backend_url: dataSubmenu.datum.backend_url,
                                    create_access: elm2.create_access,
                                    read_access: elm2.read_access,
                                    update_access: elm2.update_access,
                                    delete_access: elm2.delete_access,
                                } as CreateRoleAccessDto;
                                dataArrayRoleAccess.push(tempDataRoleAccess);
                                dataRoleSubmenu.push(elm2);
                            }
                        }
                    }
                }
                await this.roleSubmenu.bulkInsert(dataRoleSubmenu);

                // roleSubmenus.forEach(element => {
                //     element.role_id = id;
                // });

                /* INSERT */
                await this.rolac.bulkInsert(dataArrayRoleAccess);
                resSuccess = await this.findOne(id);
                resSuccess.message = 'Success Create Role';
            });

            return resSuccess;
        } catch (error) {
            this.wslog.error(error);
            this.throwingError(error);
        }
    }

    /* UPDATE */
    /* ===================================================================== */
    async updateRole(role_id: string, updateRoleDto: UpdateRoleDetailDto) {
        let resSuccess = new ResponseSuccess<Role>();
        const dataArrayRoleAccess: CreateRoleAccessDto[] = [];
        const dataRoleSubmenu: CreateRoleSubmenuDto[] = [];
        const dataArrayMenu = updateRoleDto.role_menus;

        const roleDto: UpdateRoleDto = {
            role_name: updateRoleDto.role_name,
        };

        try {
            await this.seq.transaction(async () => {
                await this.update(role_id, roleDto);

                // dataArrayRole.forEach((element) => {
                //     element.role_id = role_id;
                // });

                /* DELETE */
                await this.rolac.bulkDelete(role_id);
                await this.roleMenu.bulkDelete(role_id);
                await this.roleSubmenu.bulkDelete(role_id);

                /* INSERT TO ROLE MENUS AND SUBMENUS */
                for (let index = 0; index < dataArrayMenu.length; index++) {
                    const element = dataArrayMenu[index];
                    element.role_id = role_id;

                    /* CHECK ENABLED OR DISABLED */
                    if (element.is_checked) {
                        let tempDataRoleAccess = {} as CreateRoleAccessDto;

                        const menuHaveChild = await this.menuSvc.findOne(
                            element.menu_id,
                        );
                        if (!menuHaveChild.datum.menu_have_child) {
                            tempDataRoleAccess = {
                                role_id: role_id,
                                menu_id: element.menu_id,
                                submenu_id: null,
                                frontend_url: menuHaveChild.datum.frontend_url,
                                backend_url: menuHaveChild.datum.backend_url,
                                create_access: element.create_access,
                                read_access: element.read_access,
                                update_access: element.update_access,
                                delete_access: element.delete_access,
                            };

                            dataArrayRoleAccess.push(tempDataRoleAccess);
                        }

                        const resp = await this.roleMenu.create(element);

                        for (
                            let index = 0;
                            index < element.role_submenus.length;
                            index++
                        ) {
                            const elm2 = element.role_submenus[index];

                            if (elm2.is_checked) {
                                (elm2.role_id = role_id),
                                    (elm2.rolemenu_id = resp.data.id);
                                const dataSubmenu =
                                    await this.submenuSvc.findOne(
                                        elm2.submenu_id,
                                    );

                                tempDataRoleAccess = {
                                    role_id: role_id,
                                    menu_id: element.menu_id,
                                    submenu_id: elm2.submenu_id,
                                    frontend_url: dataSubmenu.datum.frontend_url,
                                    backend_url: dataSubmenu.datum.backend_url,
                                    create_access: elm2.create_access,
                                    read_access: elm2.read_access,
                                    update_access: elm2.update_access,
                                    delete_access: elm2.delete_access,
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
                resSuccess = await this.findOne(role_id);
                resSuccess.message = 'Success Update Role';
            });
            return resSuccess;
        } catch (error) {
            this.wslog.error(error);
            this.throwingError(error);
        }
    }
}

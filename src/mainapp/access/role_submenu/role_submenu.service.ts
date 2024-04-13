import { Injectable } from '@nestjs/common';
import { CreateRoleSubmenuDto } from './dto/create-role_submenu.dto';
import { UpdateRoleSubmenuDto } from './dto/update-role_submenu.dto';
import { RoleSubmenu } from './entities/role_submenu.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';

@Injectable()
export class RoleSubmenuService {
    constructor(
        @InjectModel(RoleSubmenu)
        private roleSubmenu: typeof RoleSubmenu,
    ) {}

    /* RESPONSE SUCCES */
    private resSuccess: any = {
        message: '',
        data: <RoleSubmenu[]>[] || <RoleSubmenu>{},
        success: false,
    };

    async create(createRoleSubmenuDto: CreateRoleSubmenuDto) {
        const dataCreate: any = {};
        dataCreate.role_id = createRoleSubmenuDto.role_id;
        dataCreate.submenu_id = createRoleSubmenuDto.submenu_id;
        dataCreate.rolemenu_id = createRoleSubmenuDto.rolemenu_id;

        const roleSubmenu = await this.roleSubmenu.create(dataCreate);

        this.resSuccess.message = 'Success Insert Role Submenu Data';
        this.resSuccess.success = true;
        this.resSuccess.data = roleSubmenu;
        delete this.resSuccess.lastPage;

        return this.resSuccess;
    }

    async findAll(req: Request) {
        const page = req.query.page == null ? 0 : Number(req.query.page) - 1;
        const limit = req.query.limit == null ? 10 : Number(req.query.limit);

        const dataRoleSubmenu = await this.roleSubmenu.findAndCountAll({
            limit: limit,
            offset: page * limit,
        });

        const lastPage =
            Number((dataRoleSubmenu.count / limit).toFixed(0)) +
            (dataRoleSubmenu.count % limit == 0 ? 0 : 1);
        this.resSuccess.message = 'Success Get Role Submenus';
        this.resSuccess.success = true;
        this.resSuccess.data = dataRoleSubmenu.rows;
        this.resSuccess.lastPage = lastPage;

        return this.resSuccess;
    }

    async findOne(id: string) {
        const dataRoleMenu = await this.roleSubmenu.findOne({
            where: { id: id },
        });
        this.resSuccess.message = 'Success Get Role Submenu';
        this.resSuccess.success = true;
        this.resSuccess.data = dataRoleMenu;
        delete this.resSuccess.lastPage;

        return this.resSuccess;
    }

    async update(id: string, updateRoleSubmenuDto: UpdateRoleSubmenuDto) {
        const dataUpdate: any = {};
        dataUpdate.role_id = updateRoleSubmenuDto.role_id;
        dataUpdate.submenu_id = updateRoleSubmenuDto.submenu_id;
        dataUpdate.rolemenu_id = updateRoleSubmenuDto.rolemenu_id;

        await this.roleSubmenu.update(dataUpdate, { where: { id: id } });
        const roleSubmenu = await this.roleSubmenu.findOne({
            where: { id: id },
        });

        this.resSuccess.message = 'Success Update Role Submenu Data';
        this.resSuccess.success = true;
        this.resSuccess.data = roleSubmenu;
        delete this.resSuccess.lastPage;

        return this.resSuccess;
    }

    async remove(id: string) {
        await this.roleSubmenu.destroy({
            where: { id: id },
        });

        this.resSuccess.message = 'Success Delete Role Submenu Data';
        this.resSuccess.success = true;
        this.resSuccess.data = null;
        delete this.resSuccess.lastPage;

        return this.resSuccess;
    }

    /* NON CRUD */
    assignData(datas: CreateRoleSubmenuDto) {
        const dataCreate: any = {};
        dataCreate.role_id = datas.role_id;
        dataCreate.rolemenu_id = datas.rolemenu_id;
        dataCreate.submenu_id = datas.submenu_id;
        return dataCreate;
    }

    async bulkInsert(rolemArray: CreateRoleSubmenuDto[]) {
        const dataCreate = [];
        rolemArray.forEach((element) => {
            const temp = this.assignData(element);
            dataCreate.push(temp);
        });

        const roleSubmenu = await this.roleSubmenu.bulkCreate(dataCreate);

        this.resSuccess.message = 'Success Insert Submenu Access Data';
        this.resSuccess.success = true;
        this.resSuccess.data = roleSubmenu;
        delete this.resSuccess.lastPage;

        return this.resSuccess;
    }

    async bulkDelete(roleId: string) {
        await this.roleSubmenu.destroy({
            where: { roleId: roleId },
        });
    }

    async deleteBysubmenu_id(submenu_id: string) {
        await this.roleSubmenu.destroy({ where: { submenu_id: submenu_id } });
    }

    async deleteByMenuId(menuId: string) {
        await this.roleSubmenu.destroy({ where: { menu_id: menuId } });
    }
}

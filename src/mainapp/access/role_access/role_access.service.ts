import { Injectable } from '@nestjs/common';
import { CreateRoleAccessDto } from './dto/create-role_access.dto';
import { UpdateRoleAccessDto } from './dto/update-role_access.dto';
import { InjectModel } from '@nestjs/sequelize';
import { RoleAccess } from './entities/role_access.entity';
import { Request } from 'express';

@Injectable()
export class RoleAccessService {
    constructor(
        @InjectModel(RoleAccess)
        private rolac: typeof RoleAccess,
    ) {}

    /* RESPONSE SUCCES */
    private resSuccess: any = {
        message: '',
        data: <RoleAccess[]>[] || <RoleAccess>{},
        success: false,
    };

    async create(createRoleAccessDto: CreateRoleAccessDto) {
        let dataCreate: any = {};
        dataCreate = this.assignData(createRoleAccessDto);

        const rolac = await this.rolac.create(dataCreate);

        this.resSuccess.message = 'Success Insert Role Access Data';
        this.resSuccess.success = true;
        this.resSuccess.data = rolac;
        delete this.resSuccess.lastPage;

        return this.resSuccess;
    }

    async findAll(req: Request) {
        const page = req.query.page == null ? 0 : Number(req.query.page) - 1;
        const limit = req.query.limit == null ? 10 : Number(req.query.limit);

        const dataRolac = await this.rolac.findAndCountAll({
            limit: limit,
            offset: page * limit,
        });

        const lastPage =
            Number((dataRolac.count / limit).toFixed(0)) +
            (dataRolac.count % limit == 0 ? 0 : 1);
        this.resSuccess.message = 'Success Get Role Access';
        this.resSuccess.success = true;
        this.resSuccess.data = dataRolac.rows;
        this.resSuccess.lastPage = lastPage;

        return this.resSuccess;
    }

    async findOne(id: string) {
        const dataRolac = await this.rolac.findOne({ where: { id: id } });
        this.resSuccess.message = 'Success Get Role Access';
        this.resSuccess.success = true;
        this.resSuccess.data = dataRolac;
        delete this.resSuccess.lastPage;

        return this.resSuccess;
    }

    async update(id: string, updateRoleAccessDto: UpdateRoleAccessDto) {
        const dataUpdate: any = {};
        dataUpdate.role_id = updateRoleAccessDto.role_id;
        dataUpdate.menu_id = updateRoleAccessDto.menu_id;
        dataUpdate.submenu_id = updateRoleAccessDto.submenu_id;
        dataUpdate.frontend_url = updateRoleAccessDto.frontend_url;
        dataUpdate.backend_url = updateRoleAccessDto.backend_url;
        dataUpdate.create_access = updateRoleAccessDto.create_access;
        dataUpdate.read_access = updateRoleAccessDto.read_access;
        dataUpdate.update_access = updateRoleAccessDto.update_access;
        dataUpdate.delete_access = updateRoleAccessDto.delete_access;

        await this.rolac.update(dataUpdate, { where: { id: id } });
        const rolac = await this.rolac.findOne({ where: { id: id } });

        this.resSuccess.message = 'Success Update Role Access Data';
        this.resSuccess.success = true;
        this.resSuccess.data = rolac;
        delete this.resSuccess.lastPage;

        return this.resSuccess;
    }

    async remove(id: string) {
        await this.rolac.destroy({
            where: { id: id },
        });

        this.resSuccess.message = 'Success Delete Role Access Data';
        this.resSuccess.success = true;
        this.resSuccess.data = null;
        delete this.resSuccess.lastPage;

        return this.resSuccess;
    }

    /* NON CRUD GENERATOR */
    assignData(datas: CreateRoleAccessDto) {
        const dataCreate: any = {};
        dataCreate.role_id = datas.role_id;
        dataCreate.menu_id = datas.menu_id;
        dataCreate.submenu_id = datas.submenu_id;
        dataCreate.frontend_url = datas.frontend_url;
        dataCreate.backend_url = datas.backend_url;
        dataCreate.create_access = datas.create_access;
        dataCreate.read_access = datas.read_access;
        dataCreate.update_access = datas.update_access;
        dataCreate.delete_access = datas.delete_access;
        return dataCreate;
    }

    async bulkInsert(rolacArray: CreateRoleAccessDto[]) {
        const dataCreate = [];
        rolacArray.forEach((element) => {
            const temp = this.assignData(element);
            dataCreate.push(temp);
        });

        const rolac = await this.rolac.bulkCreate(dataCreate);

        this.resSuccess.message = 'Success Insert Role Access Data';
        this.resSuccess.success = true;
        this.resSuccess.data = rolac;
        delete this.resSuccess.lastPage;

        return this.resSuccess;
    }

    async bulkDelete(roleId: string) {
        await this.rolac.destroy({
            where: { roleId: roleId },
        });
    }

    async deleteBysubmenu_id(submenu_id: string) {
        await this.rolac.destroy({ where: { submenu_id: submenu_id } });
    }

    async deleteByMenuId(menuId: string) {
        await this.rolac.destroy({ where: { menu_id: menuId } });
    }
}

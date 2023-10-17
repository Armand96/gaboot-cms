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
    ) { }

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

    async findOne(id: number) {
        const dataRolac = await this.rolac.findOne({ where: { id: id } });
        this.resSuccess.message = 'Success Get Role Access';
        this.resSuccess.success = true;
        this.resSuccess.data = dataRolac;
        delete this.resSuccess.lastPage;

        return this.resSuccess;
    }

    async update(id: number, updateRoleAccessDto: UpdateRoleAccessDto) {
        let dataUpdate: any = {};
        dataUpdate.roleId = updateRoleAccessDto.roleId;
        dataUpdate.menuId = updateRoleAccessDto.menuId;
        dataUpdate.submenuId = updateRoleAccessDto.submenuId;
        dataUpdate.frontendUrl = updateRoleAccessDto.frontendUrl;
        dataUpdate.backendUrl = updateRoleAccessDto.backendUrl;
        dataUpdate.create = updateRoleAccessDto.create;
        dataUpdate.read = updateRoleAccessDto.read;
        dataUpdate.updates = updateRoleAccessDto.updates;
        dataUpdate.delete = updateRoleAccessDto.delete;

        await this.rolac.update(dataUpdate, { where: { id: id } });
        const rolac = await this.rolac.findOne({ where: { id: id } });

        this.resSuccess.message = 'Success Update Role Access Data';
        this.resSuccess.success = true;
        this.resSuccess.data = rolac;
        delete this.resSuccess.lastPage;

        return this.resSuccess;
    }

    async remove(id: number) {
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
        dataCreate.roleId = datas.roleId;
        dataCreate.menuId = datas.menuId;
        dataCreate.submenuId = datas.submenuId;
        dataCreate.frontendUrl = datas.frontendUrl;
        dataCreate.backendUrl = datas.backendUrl;
        dataCreate.create = datas.create;
        dataCreate.read = datas.read;
        dataCreate.updates = datas.updates;
        dataCreate.delete = datas.delete;
        return dataCreate;
    }

    async bulkInsert(rolacArray: CreateRoleAccessDto[]) {
        let dataCreate = [];
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

    async bulkDelete(roleId: number) {
        await this.rolac.destroy({
            where: { roleId: roleId },
        });
    }

    async deleteBySubmenuId(submenuId: number) {
        await this.rolac.destroy({where:{submenuId: submenuId}});
    }

    async deleteByMenuId(menuId: number) {
        await this.rolac.destroy({where:{menuId: menuId}});
    }
}

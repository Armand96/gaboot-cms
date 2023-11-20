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
import { ResponseSuccess } from 'src/services/general/interfaces/response.dto';

@Injectable()
export class SubmenuService {
    constructor(
        @InjectModel(Submenu)
        private submenu: typeof Submenu,
        private seq: Sequelize,
        private roleSubmSvc: RoleSubmenuService,
    ) {}

    async create(createSubmenuDto: CreateSubmenuDto) {
        const resSuccess = new ResponseSuccess<Submenu>();
        const dataCreate: any = createSubmenuDto;

        const submenu = await this.submenu.create(dataCreate);

        resSuccess.message = 'Success Insert Submenu Data';
        resSuccess.success = true;
        resSuccess.datum = submenu;
        delete resSuccess.lastPage;

        return resSuccess;
    }

    async findAll(req: Request) {
        const resSuccess = new ResponseSuccess<Submenu>();
        const page = req.query.page == null ? 0 : Number(req.query.page) - 1;
        const limit = req.query.limit == null ? 10 : Number(req.query.limit);

        /* FILTER DATA */
        // console.log(req.query)
        const filterData: any = {};
        if (req.query.submenuName != undefined && req.query.submenuName != '')
            filterData.submenuName = {
                [Op.like]: `%${req.query.submenuName}%`,
            };

        const dataSubmenu = await this.submenu.findAndCountAll({
            limit: limit,
            offset: page * limit,
            where: filterData,
        });

        const lastPage =
            Number((dataSubmenu.count / limit).toFixed(0)) +
            (dataSubmenu.count % limit == 0 ? 0 : 1);
        resSuccess.message = 'Success Get Submenus';
        resSuccess.success = true;
        resSuccess.data = dataSubmenu.rows;
        resSuccess.lastPage = lastPage;

        return resSuccess;
    }

    async findByMenuId(menuId: number) {
        const resSuccess = new ResponseSuccess<Submenu>();
        const dataSubmenu = await this.submenu.findAll({
            where: { menuId: menuId },
        });
        resSuccess.message = 'Success Get Submenus';
        resSuccess.success = true;
        resSuccess.data = dataSubmenu;
        return resSuccess;
    }

    async findOne(id: number) {
        const resSuccess = new ResponseSuccess<Submenu>();
        const dataSubmenu = await this.submenu.findOne({ where: { id: id } });
        resSuccess.message = 'Success Get Submenu';
        resSuccess.success = true;
        resSuccess.datum = dataSubmenu;
        delete resSuccess.lastPage;

        return resSuccess;
    }

    async update(id: number, updateSubmenuDto: UpdateSubmenuDto) {
        const resSuccess = new ResponseSuccess<Submenu>();
        const dataUpdate: any = updateSubmenuDto;

        await this.submenu.update(dataUpdate, { where: { id: id } });
        const submenu = await this.submenu.findOne({ where: { id: id } });

        resSuccess.message = 'Success Update Submenu Data';
        resSuccess.success = true;
        resSuccess.datum = submenu;
        delete resSuccess.lastPage;

        return resSuccess;
    }

    async remove(id: number) {
        const resSuccess = new ResponseSuccess<Submenu>();

        await this.seq.transaction(async (trx) => {
            await this.submenu.destroy({
                where: { id: id },
            });

            await this.roleSubmSvc.deleteBySubmenuId(id);
        });

        resSuccess.message = 'Success Delete Submenu Data';
        resSuccess.success = true;
        resSuccess.datum = null;
        delete resSuccess.lastPage;

        return resSuccess;
    }
}

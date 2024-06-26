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
import { ResponseSuccess } from 'src/services/general/interfaces/response.dto';

@Injectable()
export class MenuService {
    constructor(
        @InjectModel(Menu)
        private menu: typeof Menu,
    ) {}

    async create(createMenuDto: CreateMenuDto) {
        const resSuccess = new ResponseSuccess<Menu>();
        const dataCreate: any = createMenuDto;

        console.log(createMenuDto);
        const menu = await this.menu.create(dataCreate);

        resSuccess.message = 'Success Insert Menu Data';
        resSuccess.success = true;
        resSuccess.datum = menu;

        return resSuccess;
    }

    async findAll(req: Request) {
        const resSuccess = new ResponseSuccess<Menu>();

        const page = req.query.page == null ? 0 : Number(req.query.page) - 1;
        const limit = req.query.limit == null ? 10 : Number(req.query.limit);

        /* FILTER DATA */
        // console.log(req.query)
        const filterData: any = {};
        if (req.query.roleName != undefined && req.query.roleName != '')
            filterData.roleName = {
                [Op.like]: `%${req.query.roleName}%`,
            };

        const dataMenu = await this.menu.findAll({
            include: [Submenu],
            limit: limit,
            offset: page * limit,
            where: filterData,
        });

        resSuccess.message = 'Success Get Menus';
        resSuccess.success = true;
        resSuccess.data = dataMenu;

        return resSuccess;
    }

    async findOne(id: string) {
        const resSuccess = new ResponseSuccess<Menu>();
        const dataMenu = await this.menu.findOne({
            where: { id: id },
            include: [Submenu],
        });
        resSuccess.message = 'Success Get Menu';
        resSuccess.success = true;
        resSuccess.datum = dataMenu;
        delete resSuccess.lastPage;

        return resSuccess;
    }

    async update(id: string, updateMenuDto: UpdateMenuDto) {
        const resSuccess = new ResponseSuccess<Menu>();
        const dataUpdate: any = {};
        dataUpdate.menu_name = updateMenuDto.menu_name;
        dataUpdate.menu_icon = updateMenuDto.menu_icon;
        dataUpdate.backend_url = updateMenuDto.backend_url;
        dataUpdate.frontend_url = updateMenuDto.frontend_url;
        dataUpdate.menu_have_child = updateMenuDto.menu_have_child;
        dataUpdate.menu_is_active = updateMenuDto.menu_is_active;

        await this.menu.update(dataUpdate, { where: { id: id } });
        const menu = await this.menu.findOne({ where: { id: id } });

        resSuccess.message = 'Success Update Menu Data';
        resSuccess.success = true;
        resSuccess.datum = menu;

        return resSuccess;
    }

    async remove(id: string) {
        const resSuccess = new ResponseSuccess<Menu>();
        await this.menu.destroy({
            where: { id: id },
        });

        resSuccess.message = 'Success Delete Menu Data';
        resSuccess.success = true;
        resSuccess.datum = null;

        return resSuccess;
    }
}

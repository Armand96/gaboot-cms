import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { GeneralService } from 'src/services/general/general.service';
import { Op } from 'sequelize';
import { PathImageObj } from 'src/services/general/interfaces/path-image';
import { Role } from '../role/entities/role.entity';
import { RoleAccess } from 'src/mainapp/access/role_access/entities/role_access.entity';
import { RoleMenu } from 'src/mainapp/access/role_menu/entities/role_menu.entity';
import { RoleSubmenu } from 'src/mainapp/access/role_submenu/entities/role_submenu.entity';
import { Menu } from '../menu/entities/menu.entity';
import { Submenu } from '../submenu/entities/submenu.entity';
import { ResponseSuccess } from 'src/services/general/interfaces/response.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)
        private user: typeof User,
        private gen: GeneralService,
        private resSuccess: ResponseSuccess<User>, // private imprt: ImportService,
    ) // private exprt: ExportService,
    { }

    /* HASH */
    async getHash(password: string) {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        return hash;
    }

    async checkHash(password: string, hash: string) {
        return await bcrypt.compare(password, hash);
    }

    /* CREATE USER */
    async create(createUserDto: CreateUserDto, image: Express.Multer.File) {
        let pathObj = {} as PathImageObj;

        if (image != null) {
            pathObj = await this.gen.uploadImage(
                image,
                createUserDto.username,
                'user',
            );
            console.log('after upload');
        }

        createUserDto.password = await this.getHash(createUserDto.password);
        // console.log(createUserDto);

        if (image != null) {
            createUserDto.image_path = pathObj.path;
            createUserDto.thumbnail_path = pathObj.thumbPath;
        }

        const user = await this.user.create(createUserDto);

        delete user.password;

        this.resSuccess.message = 'Success Insert User Data';
        this.resSuccess.success = true;
        this.resSuccess.datum = user;

        return this.resSuccess.toJson();
    }

    /* FIND USER */
    async findAll(req: Request) {
        const page = req.query.page == null ? 0 : Number(req.query.page) - 1;
        const limit = req.query.limit == null ? 10 : Number(req.query.limit);

        /* FILTER DATA */
        // console.log(req.query)
        const filterData: any = {};
        if (req.query.username != undefined && req.query.username != '')
            filterData.username = {
                [Op.like]: `%${req.query.username}%`,
            };

        if (req.query.full_name != undefined && req.query.full_name != '')
            filterData.full_name = {
                [Op.like]: `%${req.query.full_name}%`,
            };

        const dataUser = await this.user.findAndCountAll({
            include: [
                {
                    model: Role,
                    required: true,
                },
            ],
            limit: limit,
            offset: page * limit,
            where: filterData,
        });

        const lastPage =
            Number((dataUser.count / limit).toFixed(0)) +
            (dataUser.count % limit == 0 ? 0 : 1);

        this.resSuccess.message = 'Success Get User Data';
        this.resSuccess.success = true;
        this.resSuccess.data = dataUser.rows;
        this.resSuccess.lastPage = lastPage;
        this.resSuccess.totalData = dataUser.count;

        return this.resSuccess.toJson();
    }

    /* FIND SINGLE USER */
    async findOne(id: string) {
        console.log('manggil di mari');
        const dataUser = await this.user.findOne({
            where: { id: id },
            include: [
                {
                    model: Role,
                    required: true,
                    include: [
                        RoleAccess,
                        {
                            model: RoleMenu,
                            required: true,
                            include: [
                                Menu,
                                {
                                    model: RoleSubmenu,
                                    required: true,
                                    include: [Submenu],
                                    separate: true,
                                    order: [['submenu_id', 'asc']]
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        this.resSuccess.message = 'Success Get User';
        this.resSuccess.success = true;
        this.resSuccess.datum = dataUser;

        return this.resSuccess.toJson();
    }

    /* UPDATE USER */
    async update(
        id: string,
        updateUserDto: UpdateUserDto,
        image: Express.Multer.File,
    ) {
        // let pathName = '';
        let pathObj = {} as PathImageObj;

        if (image != null) {
            //   pathName = `${this.pathImage + '/' + updateUserDto.username}`;
            pathObj = await this.gen.uploadImage(
                image,
                updateUserDto.username,
                'user',
            );
        }

        if (updateUserDto.password != '') {
            console.log('ganti password');
            updateUserDto.password = await this.getHash(updateUserDto.password);
        } else {
            console.log('kaga');
            delete updateUserDto.password;
        }

        console.log('UPDATE USER', updateUserDto);
        updateUserDto.is_active = updateUserDto.is_active;
        if (image != null) {
            updateUserDto.image_path = pathObj.path;
            updateUserDto.thumbnail_path = pathObj.thumbPath;
        }
        // console.log(updateUserDto, updateUserDto);
        updateUserDto.updated_at = this.gen.dateNow();

        await this.user.update(updateUserDto, {
            where: { id: id },
        });

        const user = await this.user.findOne({ where: { id: id } });

        this.resSuccess.message = 'Success Update User Data';
        this.resSuccess.success = true;
        this.resSuccess.datum = user;

        return this.resSuccess.toJson();
    }

    /* DELETE USER */
    async remove(id: string) {
        const user = await this.user.findOne({ where: { id: id } });

        await this.user.destroy({
            where: { id: id },
        });

        if (user.image_path != '' || user.image_path != null) {
            this.gen.removeImage(user.image_path);
            this.gen.removeImage(user.thumbnail_path);
        }

        this.resSuccess.message = 'Success Delete User Data';
        this.resSuccess.success = true;
        this.resSuccess.data = null;

        return this.resSuccess.toJson();
    }

    /* GET IMAGE */
    async userImage(id: string): Promise<User> {
        console.log('image');
        const dataUser = await this.user.findOne({
            where: { id: id },
        });
        return dataUser;
    }

    async userOnly(id: string) {
        console.log('di mari');
        const dataUser = await this.user.findOne({
            where: { id: id },
        });

        this.resSuccess.message = 'Success Get User';
        this.resSuccess.success = true;
        this.resSuccess.datum = dataUser;

        return this.resSuccess.toJson();
    }

    /* LOGIN USER */
    async userLogin(username: string, password: string) {
        const user = await this.user
            .scope('withPassword')
            .findOne({
                where: { username: username },
                include: [
                    {
                        model: Role,
                        required: true,
                        include: [
                            RoleAccess,
                            {
                                model: RoleMenu,
                                required: true,
                                include: [
                                    Menu,
                                    {
                                        model: RoleSubmenu,
                                        required: true,
                                        include: [Submenu],
                                        separate: true,
                                        order: [['submenu_id', 'asc']]
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
        const isValid = await this.checkHash(password, user.password);
        console.log(isValid);
        if (isValid) return user;
        else return null;
    }

    /* FIND BY USERNAME */
    async findByUsername(username: string) {
        return await this.user.findOne({ where: { username: username } });
    }
}

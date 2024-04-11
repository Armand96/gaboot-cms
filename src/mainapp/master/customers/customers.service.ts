import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

import * as bcrypt from 'bcrypt';
import { GeneralService } from 'src/services/general/general.service';
import { PathImageObj } from 'src/services/general/interfaces/path-image';
import { Request } from 'express';
import { Op } from 'sequelize';
import { ResponseSuccess } from 'src/services/general/interfaces/response.dto';

@Injectable()
export class CustomersService {
    constructor(
        @InjectModel(Customer)
        private customer: typeof Customer,
        private gen: GeneralService,
    ) {}

    async create(
        createCustomerDto: CreateCustomerDto,
        image: Express.Multer.File,
    ) {
        let pathObj = {} as PathImageObj;

        if (image != null) {
            pathObj = await this.gen.uploadImage(
                image,
                createCustomerDto.username,
                'customer',
            );
            console.log('after upload');
        }

        createCustomerDto.password = await this.getHash(
            createCustomerDto.password,
        );
        // console.log(createCustomerDto);

        if (image != null) {
            createCustomerDto.image_path = pathObj.path;
            createCustomerDto.thumbnail_path = pathObj.thumbPath;
        }

        const dataCreation: any = createCustomerDto;

        const customer = await this.customer.create(dataCreation);

        delete customer.password;

        const resSuccess = new ResponseSuccess<Customer>();
        resSuccess.message = 'Success Insert Customer Data';
        resSuccess.success = true;
        resSuccess.datum = customer;

        return resSuccess;
    }

    async findAll(req: Request) {
        const page = req.query.page == null ? 0 : Number(req.query.page) - 1;
        const limit = req.query.limit == null ? 10 : Number(req.query.limit);

        /* FILTER DATA */
        // console.log(req.query)
        const filterData: any = {};
        if (req.query.userName != undefined && req.query.userName != '')
            filterData.userName = {
                [Op.like]: `%${req.query.userName}%`,
            };

        if (req.query.fullName != undefined && req.query.fullName != '')
            filterData.fullName = {
                [Op.like]: `%${req.query.fullName}%`,
            };

        const customer = await this.customer.findAndCountAll({
            limit: limit,
            offset: page * limit,
            where: filterData,
        });

        const lastPage =
            Number((customer.count / limit).toFixed(0)) +
            (customer.count % limit == 0 ? 0 : 1);

        const resSuccess = new ResponseSuccess<Customer>();
        resSuccess.message = 'Success Get Customer Data';
        resSuccess.success = true;
        resSuccess.data = customer.rows;
        resSuccess.lastPage = lastPage;

        return resSuccess;
    }

    async findOne(id: string) {
        const customer = await this.customer.findOne({
            where: { id: id },
        });

        const resSuccess = new ResponseSuccess<Customer>();
        resSuccess.message = 'Success Get Customer';
        resSuccess.success = true;
        resSuccess.datum = customer;

        return resSuccess;
    }

    async update(
        id: string,
        updateCustomerDto: UpdateCustomerDto,
        image: Express.Multer.File,
    ) {
        // let pathName = '';
        let pathObj = {} as PathImageObj;

        if (image != null) {
            //   pathName = `${this.pathImage + '/' + updateCustomerDto.userName}`;
            pathObj = await this.gen.uploadImage(
                image,
                updateCustomerDto.username,
                'customer',
            );
        }

        if (
            updateCustomerDto.password != null ||
            updateCustomerDto.password != ''
        )
            updateCustomerDto.password = await this.getHash(
                updateCustomerDto.password,
            );

        if (
            updateCustomerDto.password != null ||
            updateCustomerDto.password != ''
        )
            updateCustomerDto.password = updateCustomerDto.password;

        updateCustomerDto.is_active = updateCustomerDto.is_active;
        if (image != null) {
            updateCustomerDto.image_path = pathObj.path;
            updateCustomerDto.thumbnail_path = pathObj.thumbPath;
        }
        // console.log(updateCustomerDto, updateCustomerDto);
        updateCustomerDto.updated_at = this.gen.dateNow();

        await this.customer.update(updateCustomerDto, {
            where: { id: id },
        });

        const user = await this.customer.findOne({ where: { id: id } });

        const resSuccess = new ResponseSuccess<Customer>();
        resSuccess.message = 'Success Update Customer Data';
        resSuccess.success = true;
        resSuccess.datum = user;

        return resSuccess;
    }

    async remove(id: string) {
        const user = await this.customer.findOne({ where: { id: id } });

        await this.customer.destroy({
            where: { id: id },
        });

        if (user.image_path != '' || user.image_path != null) {
            this.gen.removeImage(user.image_path);
            this.gen.removeImage(user.thumbnail_path);
        }

        const resSuccess = new ResponseSuccess<Customer>();
        resSuccess.message = 'Success Delete Customer Data';
        resSuccess.success = true;
        resSuccess.data = null;

        return resSuccess;
    }

    /* HASH */
    private async getHash(password: string) {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        return hash;
    }

    private async checkHash(password: string, hash: string) {
        return await bcrypt.compare(password, hash);
    }
}

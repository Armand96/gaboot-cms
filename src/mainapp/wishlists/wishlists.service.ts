import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { Op } from 'sequelize';
import { ResponseSuccess } from 'src/services/general/interfaces/response.dto';

@Injectable()
export class WishlistsService {
    constructor(
        @InjectModel(Wishlist) private wishlistModel: typeof Wishlist,
        private response: ResponseSuccess<Wishlist>,
    ) {}

    async create(createWishlistDto: CreateWishlistDto) {
        return 'This action adds a new wishlist';
    }

    async findAll(req: Request) {
        const page = req.query.page == null ? 0 : Number(req.query.page) - 1;
        const limit = req.query.limit == null ? 10 : Number(req.query.limit);

        const filterData: any = {};
        if (req.query.name != undefined && req.query.name != '')
            filterData.name = {
                [Op.like]: `%${req.query.name}%`,
            };

        const wishlists = await this.wishlistModel.findAll({
            limit: limit,
            offset: page * limit,
            where: filterData,
        });

        if (wishlists.length == 0) {
            throw new NotFoundException('No Data Found');
        }

        this.response.message = 'Success Get Wishlists';
        this.response.success = true;
        this.response.data = wishlists;

        return this.response.toJson();
    }

    async findOne(id: number) {
        const wishlist = await this.wishlistModel.findOne({
            where: { id: id },
        });

        if (wishlist == null) {
            throw new NotFoundException('Not Data Found');
        }

        this.response.message = 'Success Get Wishlist';
        this.response.success = true;
        this.response.datum = wishlist;

        return this.response.toJson();
    }

    async update(id: number, updateWishlistDto: UpdateWishlistDto) {
        return `This action updates a #${id} wishlist`;
    }

    async remove(id: number) {
        return `This action removes a #${id} wishlist`;
    }
}

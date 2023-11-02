import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Injectable()
export class WishlistsService {
  async create(createWishlistDto: CreateWishlistDto) {
    return 'This action adds a new wishlist';
  }

  async findAll() {
    return `This action returns all wishlists`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} wishlist`;
  }

  async update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return `This action updates a #${id} wishlist`;
  }

  async remove(id: number) {
    return `This action removes a #${id} wishlist`;
  }
}

import { Module } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { WishlistsController } from './wishlists.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Wishlist } from './entities/wishlist.entity';

@Module({
  imports: [SequelizeModule.forFeature([Wishlist])],
  controllers: [WishlistsController],
  providers: [WishlistsService],
})
export class WishlistsModule {}

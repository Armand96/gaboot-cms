import {
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Product } from 'src/mainapp/master/products/entities/product.entity';

@Table({

  tableName: 'wishlists',
  timestamps: true,
  defaultScope: {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  }
})

export class Wishlist extends Model
{
  @ForeignKey(() => Product)
  @Column
  productId: number

  @Column
  category: string
  
  @HasMany(() => Product)
  products: Product[]
}

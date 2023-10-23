import {
  BelongsTo,
  Column,
  ForeignKey,
  HasOne,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Category } from 'src/mainapp/categories/entities/category.entity';
import { Wishlist } from 'src/mainapp/wishlists/entities/wishlist.entity';

@Table({

  tableName: 'master_products',
  timestamps: true,
  defaultScope: {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  }
})
export class Product extends Model
{
  @Column
  name: string

  @Column
  description: string

  @Column
  price: number

  @Column
  stock: number

  @Column
  dimension: string

  @Column
  weight: number

  @Column
  weightUnit: string

  @ForeignKey(() => Category)
  @Column
  categoryId: number

  @ForeignKey(() => Wishlist)
  @Column
  wishlistId: number
  
  @BelongsTo(() => Category)
  category: Category

  @BelongsTo(() => Wishlist)
  wishlist: Wishlist
}

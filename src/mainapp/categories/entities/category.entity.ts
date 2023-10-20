import {
  Column,
  HasMany,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Product } from 'src/mainapp/master/products/entities/product.entity';

@Table({

  tableName: 'categories',
  timestamps: true,
  defaultScope: {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  }
})
export class Category extends Model
{
  @Unique
  @Column
  name: string

  @Column
  description: string

  @Column
  imagePath: string

  @Column
  thumbnailPath: string
  
  @HasMany(() => Product)
  products: Product[]
}

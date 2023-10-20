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
  stock: number

  @Column
  size: number

  @ForeignKey(() => Category)
  @Column
  category_id: number
  
  @BelongsTo(() => Category)
  category: Category
}

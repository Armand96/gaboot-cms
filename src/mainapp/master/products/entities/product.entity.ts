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
  
  @BelongsTo(() => Category)
  category: Category
}

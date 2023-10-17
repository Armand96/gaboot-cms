import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { IUser } from './user.interface';
import { Role } from '../../role/entities/role.entity';

@Table({

  tableName: 'master_users',
  timestamps: true,
  defaultScope: {
    attributes: {
      exclude: ['password', 'createdAt', 'updatedAt'],
    },
  },
  scopes: {
    withPassword: {
      attributes: {
        include: ['password'],
      },
    },
  },
})
export class User extends Model<IUser, IUser> {

  @Unique
  @Column
  userName: string;
  
  @Unique
  @Column
  email: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  password: string;

  // @Default('abcdefgh')
  @Column
  token: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @Column
  imgPath: string;

  @Column
  imgThumbPath: string;

  @ForeignKey(() => Role)
  @Column
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;
}

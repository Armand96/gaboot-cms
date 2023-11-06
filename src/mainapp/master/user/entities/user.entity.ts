import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { IUser } from './user.interface';
import { Role } from '../../role/entities/role.entity';
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({ example: "admoon", description: 'Nama pengguna' })
  @Unique
  @Column
  userName: string;
  
  @ApiProperty({ example: "admoon@admoon.com", description: 'Email pengguna' })
  @Unique
  @Column
  email: string;

  @ApiProperty({ example: "haji", description: 'Nama Depan' })
  @Column
  firstName: string;

  @ApiProperty({ example: "Bolot", description: 'Nama Belakang' })
  @Column
  lastName: string;

  @ApiProperty({ example: "password", description: 'Ya password lah' })
  @Column
  password: string;

  // @Default('abcdefgh')
  @Column
  token: string;

  @ApiProperty({ example: true, description: 'User Aktif atau Tidak' })
  @Column({ defaultValue: true })
  isActive: boolean;

  @ApiProperty({ example: "/storage/bla/bla", description: 'Path Foto' })
  @Column
  imgPath: string;

  @ApiProperty({ example: "/storage/bla/bla", description: 'Path Foto Thumb' })
  @Column
  imgThumbPath: string;

  @ApiProperty({ example: 1, description: 'Path Foto Thumb' })
  @ForeignKey(() => Role)
  @Column
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;
}

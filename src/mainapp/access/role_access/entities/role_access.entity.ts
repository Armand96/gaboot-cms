import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Menu } from 'src/mainapp/master/menu/entities/menu.entity';
import { Role } from 'src/mainapp/master/role/entities/role.entity';
import { Submenu } from 'src/mainapp/master/submenu/entities/submenu.entity';

@Table({
  tableName: 'role_accesses',
  timestamps: true,
  defaultScope: {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  },
})
export class RoleAccess extends Model {
  @ForeignKey(() => Role)
  @Column
  roleId: number;

  @ForeignKey(() => Menu)
  @Column
  menuId: number;

  @ForeignKey(() => Submenu)
  @Column
  submenuId: number;

  @Column
  frontendUrl: string;

  @Column
  backendUrl: string;

  @Column
  create: boolean;

  @Column
  read: boolean;

  @Column
  updates: boolean;

  @Column
  delete: boolean;

  /* RELATION */
  @BelongsTo(() => Role)
  role: Role;

  @BelongsTo(() => Menu)
  menu: Menu;

  @BelongsTo(() => Submenu)
  submenu: Submenu;
}

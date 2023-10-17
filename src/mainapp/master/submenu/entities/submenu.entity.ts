import {
  BelongsTo,
  Column,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { RoleAccess } from 'src/mainapp/access/role_access/entities/role_access.entity';
import { Menu } from '../../menu/entities/menu.entity';

@Table({
  tableName: 'master_submenus',
  timestamps: true,
  defaultScope: {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  },
})
export class Submenu extends Model {
  @ForeignKey(() => Menu)
  @Column
  menuId: number;

  @BelongsTo(() => Menu)
  Menu: Menu;

  @HasOne(() => RoleAccess)
  access: RoleAccess;

  @Column
  submenuName: string;

  @Column
  submenuIcon: string;

  @Column
  frontendUrl: string;

  @Column
  backendUrl: string;

  @Column
  submenuIsActive: boolean;
}

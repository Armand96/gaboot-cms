import {
    BelongsTo,
    Column,
    ForeignKey,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';

import { RoleSubmenu } from '../../role_submenu/entities/role_submenu.entity';
import { Role } from 'src/mainapp/master/role/entities/role.entity';
import { Menu } from 'src/mainapp/master/menu/entities/menu.entity';

@Table({
    tableName: 'role_menus',
    timestamps: true,
    defaultScope: {
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
    },
})
export class RoleMenu extends Model {
    @ForeignKey(() => Role)
    @Column
    roleId: number;

    @ForeignKey(() => Menu)
    @Column
    menuId: number;

    /* RELATION */
    @BelongsTo(() => Role)
    role: Role;

    @BelongsTo(() => Menu)
    menu: Menu;

    @HasMany(() => RoleSubmenu)
    submenus: RoleSubmenu[];
}

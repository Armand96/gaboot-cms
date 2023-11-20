import {
    ForeignKey,
    Column,
    BelongsTo,
    Table,
    Model,
} from 'sequelize-typescript';
import { Role } from 'src/mainapp/master/role/entities/role.entity';
import { RoleMenu } from '../../role_menu/entities/role_menu.entity';
import { Submenu } from 'src/mainapp/master/submenu/entities/submenu.entity';

@Table({
    tableName: 'role_submenus',
    timestamps: true,
    defaultScope: {
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
    },
})
export class RoleSubmenu extends Model {
    @ForeignKey(() => Role)
    @Column
    roleId: number;

    @ForeignKey(() => RoleMenu)
    roleMenuId: number;

    @ForeignKey(() => Submenu)
    @Column
    submenuId: number;

    /* RELATION */
    @BelongsTo(() => Role)
    role: Role;

    @BelongsTo(() => Submenu)
    submenu: Submenu;

    @BelongsTo(() => RoleMenu)
    roleMenu: RoleMenu;
}

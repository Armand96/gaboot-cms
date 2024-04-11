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
    createdAt: 'created_at', updatedAt: 'updated_at',
    defaultScope: {
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
    },
})
export class RoleSubmenu extends Model {
    @ForeignKey(() => Role)
    @Column
    role_id: string;

    @ForeignKey(() => RoleMenu)
    @Column
    rolemenu_id: string;

    @ForeignKey(() => Submenu)
    @Column
    submenu_id: string;

    /* RELATION */
    @BelongsTo(() => Role)
    role: Role;

    @BelongsTo(() => Submenu)
    submenu: Submenu;

    @BelongsTo(() => RoleMenu)
    role_menu: RoleMenu;
}

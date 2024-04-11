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
    createdAt: 'created_at', updatedAt: 'updated_at',
    defaultScope: {
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
    },
})
export class RoleAccess extends Model {
    @ForeignKey(() => Role)
    @Column
    role_id: string;

    @ForeignKey(() => Menu)
    @Column
    menu_id: string;

    @ForeignKey(() => Submenu)
    @Column
    submenu_id: string;

    @Column
    frontend_url: string;

    @Column
    backend_url: string;

    @Column
    create_access: boolean;

    @Column
    read_access: boolean;

    @Column
    update_access: boolean;

    @Column
    delete_access: boolean;

    /* RELATION */
    @BelongsTo(() => Role)
    role: Role;

    @BelongsTo(() => Menu)
    menu: Menu;

    @BelongsTo(() => Submenu)
    submenu: Submenu;
}

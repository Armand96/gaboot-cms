import { Column, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { Submenu } from '../../submenu/entities/submenu.entity';
import { RoleAccess } from 'src/mainapp/access/role_access/entities/role_access.entity';

@Table({
    tableName: 'master_menus',
    timestamps: true,
    createdAt: 'created_at', updatedAt: 'updated_at',
    defaultScope: {
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
    },
})
export class Menu extends Model {
    @Column
    menu_name: string;

    @Column
    menu_icon: string;

    @Column
    backend_url: string;

    @Column
    frontend_url: string;

    @Column
    menu_have_child: boolean;

    @Column
    menu_is_active: boolean;

    @HasMany(() => Submenu)
    submenus: Submenu[];

    @HasMany(() => RoleAccess)
    access: RoleAccess[];
}

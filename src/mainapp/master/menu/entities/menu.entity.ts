import { Column, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { Submenu } from '../../submenu/entities/submenu.entity';
import { RoleAccess } from 'src/mainapp/access/role_access/entities/role_access.entity';


@Table({
    tableName: 'master_menus',
    timestamps: true,
    defaultScope: {
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
    },
})
export class Menu extends Model {
    @Column
    menuName: string;

    @Column
    menuIcon: string;

    @Column
    backendUrl: string;

    @Column
    frontendUrl: string;

    @Column
    menuHaveChild: boolean;

    @Column
    menuIsActive: boolean;

    @HasMany(() => Submenu)
    submenus: Submenu[];

    @HasOne(() => RoleAccess)
    access: RoleAccess[];
}

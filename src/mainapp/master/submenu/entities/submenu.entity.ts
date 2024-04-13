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
    createdAt: 'created_at', updatedAt: 'updated_at',
    defaultScope: {
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
    },
})
export class Submenu extends Model {
    @ForeignKey(() => Menu)
    @Column
    menu_id: string;

    @BelongsTo(() => Menu)
    menu: Menu;

    @HasOne(() => RoleAccess)
    access: RoleAccess;

    @Column
    submenu_name: string;

    @Column
    submenu_icon: string;

    @Column
    frontend_url: string;

    @Column
    backend_url: string;

    @Column
    submenu_is_active: boolean;
}

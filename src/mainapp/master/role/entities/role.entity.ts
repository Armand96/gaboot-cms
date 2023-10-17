import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';
import { RoleAccess } from 'src/mainapp/access/role_access/entities/role_access.entity';
import { RoleMenu } from 'src/mainapp/access/role_menu/entities/role_menu.entity';


@Table({
    tableName: 'master_roles',
    timestamps: true,
    defaultScope: {
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
    },
})
export class Role extends Model {
    @Column
    roleName: string;

    /* RELATION */
    @HasMany(() => User)
    user: User[];

    @HasMany(() => RoleAccess)
    access: RoleAccess[];

    @HasMany(() => RoleMenu)
    menus: RoleMenu[];
}

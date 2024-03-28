import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';
import { RoleAccess } from 'src/mainapp/access/role_access/entities/role_access.entity';
import { RoleMenu } from 'src/mainapp/access/role_menu/entities/role_menu.entity';
import { ApiProperty } from '@nestjs/swagger';

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
    @ApiProperty({example: "Admin", description: "Role Name"})
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

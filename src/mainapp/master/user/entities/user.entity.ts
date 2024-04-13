import {
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    Table,
    Unique,
} from 'sequelize-typescript';
import { IUser } from './user.interface';
import { Role } from '../../role/entities/role.entity';
import { ApiProperty } from '@nestjs/swagger';

@Table({
    tableName: 'master_users',
    timestamps: true,
    createdAt: 'created_at', updatedAt: 'updated_at',
    defaultScope: {
        attributes: {
            exclude: ['password', 'created_at', 'updated_at'],
        },
    },
    scopes: {
        withPassword: {
            attributes: {
                include: ['password'],
                exclude: ['created_at', 'updated_at'],
            },
        },
    },
})
export class User extends Model<IUser, IUser> {
    @ApiProperty({ example: 'admoon', description: 'Nama pengguna' })
    @Unique
    @Column
    username: string;

    @ApiProperty({
        example: 'admoon@admoon.com',
        description: 'Email pengguna',
    })
    @Unique
    @Column
    email: string;

    @ApiProperty({ example: 'haji', description: 'Nama Depan' })
    @Column
    firstname: string;

    @ApiProperty({ example: 'Bolot', description: 'Nama Belakang' })
    @Column
    lastname: string;

    @ApiProperty({ example: 'password', description: 'Ya password lah' })
    @Column
    password: string;

    // @Default('abcdefgh')
    @Column
    token: string;

    @ApiProperty({ example: true, description: 'User Aktif atau Tidak' })
    @Column({ defaultValue: true })
    is_active: boolean;

    @ApiProperty({ example: '/storage/bla/bla', description: 'Path Foto' })
    @Column
    image_path: string;

    @ApiProperty({
        example: '/storage/bla/bla',
        description: 'Path Foto Thumb',
    })
    @Column
    thumbnail_path: string;

    @ApiProperty({ example: 1, description: 'Role pengguna' })
    @ForeignKey(() => Role)
    @Column
    role_id: string;

    @ApiProperty({ example: Role.rawAttributes, description: "Role Model" })
    @BelongsTo(() => Role)
    role: Role;
}

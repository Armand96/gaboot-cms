import { Column, Model, Table, Unique } from 'sequelize-typescript';

@Table({
    tableName: 'master_customers',
    timestamps: true,
    createdAt: 'created_at', updatedAt: 'updated_at',
    defaultScope: {
        attributes: {
            exclude: ['password', 'createdAt', 'updatedAt'],
        },
    },
    scopes: {
        withPassword: {
            attributes: {
                include: ['password'],
            },
        },
    },
})
export class Customer extends Model {
    @Column
    firstname: string;

    @Column
    lastname: string;

    @Unique
    @Column
    username: string;

    @Unique
    @Column
    email: string;

    @Column
    phone_number: string;

    @Column
    address_detail: string;

    @Column
    latitude: number;

    @Column
    longitude: number;

    @Column
    password: string;

    @Column
    token: string;

    @Column
    is_active: boolean;

    @Column
    image_path: string;

    @Column
    thumbnail_path: string;
}

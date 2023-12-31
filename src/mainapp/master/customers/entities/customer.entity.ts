import { Column, Model, Table, Unique } from 'sequelize-typescript';

@Table({
    tableName: 'master_customers',
    timestamps: true,
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
    phoneNumber: string;

    @Column
    addressDetail: string;

    @Column
    latitude: number;

    @Column
    longitude: number;

    @Column
    password: string;

    @Column
    token: string;

    @Column
    isActive: boolean;

    @Column
    imgPath: string;

    @Column
    imgThumbPath: string;
}

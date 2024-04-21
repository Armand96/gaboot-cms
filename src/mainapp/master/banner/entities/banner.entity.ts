import { Column, Model, Table } from "sequelize-typescript";

@Table({
    tableName: 'banners',
    timestamps: true,
    createdAt: 'created_at', updatedAt: 'updated_at',
    defaultScope: {
        attributes: {
            exclude: ['created_at', 'updated_at'],
        },
    },
})
export class Banner extends Model {
    @Column
    name: string;

    @Column
    image_path: string;

    @Column
    thumbnail_path: string;
}

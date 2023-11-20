import { Module } from '@nestjs/common';
import { SubmenuService } from './submenu.service';
import { SubmenuController } from './submenu.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Submenu } from './entities/submenu.entity';
import { RoleSubmenuModule } from 'src/mainapp/access/role_submenu/role_submenu.module';
import { RoleAccessModule } from 'src/mainapp/access/role_access/role_access.module';

@Module({
    imports: [
        SequelizeModule.forFeature([Submenu]),
        RoleAccessModule,
        RoleSubmenuModule,
    ],
    controllers: [SubmenuController],
    providers: [SubmenuService],
    exports: [SubmenuService],
})
export class SubmenuModule {}

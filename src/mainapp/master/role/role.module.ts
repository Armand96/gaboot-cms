import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { GeneralService } from 'src/services/general/general.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './entities/role.entity';

import { IsRoleAlreadyExistConstraint } from './dto/rule/is-unique-rolename.decorator';
import { MenuModule } from '../menu/menu.module';
import { SubmenuModule } from '../submenu/submenu.module';
import { RoleAccessModule } from 'src/mainapp/access/role_access/role_access.module';
import { RoleMenuModule } from 'src/mainapp/access/role_menu/role_menu.module';
import { RoleSubmenuModule } from 'src/mainapp/access/role_submenu/role_submenu.module';

@Module({
    imports: [
        SequelizeModule.forFeature([Role]),
        RoleAccessModule,
        RoleMenuModule,
        RoleSubmenuModule,
        MenuModule,
        SubmenuModule
    ],
    controllers: [RoleController],
    providers: [RoleService, GeneralService, IsRoleAlreadyExistConstraint],
})
export class RoleModule { }

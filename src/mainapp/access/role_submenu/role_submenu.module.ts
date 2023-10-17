import { Module } from '@nestjs/common';
import { RoleSubmenuService } from './role_submenu.service';
import { RoleSubmenuController } from './role_submenu.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleSubmenu } from './entities/role_submenu.entity';

@Module({
  imports: [SequelizeModule.forFeature([RoleSubmenu])],
  controllers: [RoleSubmenuController],
  providers: [RoleSubmenuService],
  exports: [RoleSubmenuService],
})
export class RoleSubmenuModule {}

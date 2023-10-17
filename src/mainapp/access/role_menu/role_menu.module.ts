import { Module } from '@nestjs/common';
import { RoleMenuService } from './role_menu.service';
import { RoleMenuController } from './role_menu.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleMenu } from './entities/role_menu.entity';

@Module({
  imports: [SequelizeModule.forFeature([RoleMenu])],
  controllers: [RoleMenuController],
  providers: [RoleMenuService],
  exports: [RoleMenuService],
})
export class RoleMenuModule { }

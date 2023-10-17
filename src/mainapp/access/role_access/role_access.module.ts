import { Module } from '@nestjs/common';
import { RoleAccessService } from './role_access.service';
import { RoleAccessController } from './role_access.controller';
import { RoleAccess } from './entities/role_access.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([RoleAccess])],
  controllers: [RoleAccessController],
  providers: [RoleAccessService],
  exports: [RoleAccessService],
})
export class RoleAccessModule {}

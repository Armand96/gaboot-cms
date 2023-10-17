import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { RoleMenuService } from './role_menu.service';
import { CreateRoleMenuDto } from './dto/create-role_menu.dto';
import { UpdateRoleMenuDto } from './dto/update-role_menu.dto';
import { Request } from 'express';

@Controller('role-menu')
export class RoleMenuController {
  constructor(private readonly roleMenuService: RoleMenuService) { }

  @Post()
  create(@Body() createRoleMenuDto: CreateRoleMenuDto) {
    return this.roleMenuService.create(createRoleMenuDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.roleMenuService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleMenuService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoleMenuDto: UpdateRoleMenuDto,
  ) {
    return this.roleMenuService.update(+id, updateRoleMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleMenuService.remove(+id);
  }
}

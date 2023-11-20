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
import { RoleSubmenuService } from './role_submenu.service';
import { CreateRoleSubmenuDto } from './dto/create-role_submenu.dto';
import { UpdateRoleSubmenuDto } from './dto/update-role_submenu.dto';
import { Request } from 'express';

@Controller('role-submenu')
export class RoleSubmenuController {
    constructor(private readonly roleSubmenuService: RoleSubmenuService) {}

    @Post()
    create(@Body() createRoleSubmenuDto: CreateRoleSubmenuDto) {
        return this.roleSubmenuService.create(createRoleSubmenuDto);
    }

    @Get()
    findAll(@Req() req: Request) {
        return this.roleSubmenuService.findAll(req);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.roleSubmenuService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateRoleSubmenuDto: UpdateRoleSubmenuDto,
    ) {
        return this.roleSubmenuService.update(+id, updateRoleSubmenuDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.roleSubmenuService.remove(+id);
    }
}

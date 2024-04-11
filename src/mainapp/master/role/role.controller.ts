import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
    ValidationPipe,
    UsePipes,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Request } from 'express';
import { CreateRoleDetailDto } from './dto/create-role-detail.dto';
import { UpdateRoleDetailDto } from './dto/update-role-detail.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Role')
@ApiBearerAuth('jwt')
@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.roleService.create(createRoleDto);
    }

    @Get()
    findAll(@Req() req: Request) {
        return this.roleService.findAll(req);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.roleService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
        return this.roleService.update(id, updateRoleDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.roleService.remove(id);
    }

    /* NON CRUD */
    @Post('new')
    @UsePipes(new ValidationPipe())
    newRole(@Body() createRoleDto: CreateRoleDetailDto) {
        return this.roleService.createNewRole(createRoleDto);
    }

    @Patch('update/:id')
    @UsePipes(new ValidationPipe())
    updateRole(
        @Param('id') id: string,
        @Body() updateRoleDto: UpdateRoleDetailDto,
    ) {
        return this.roleService.updateRole(id, updateRoleDto);
    }
}

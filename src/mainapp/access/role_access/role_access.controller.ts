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
import { RoleAccessService } from './role_access.service';
import { CreateRoleAccessDto } from './dto/create-role_access.dto';
import { UpdateRoleAccessDto } from './dto/update-role_access.dto';
import { Request } from 'express';

@Controller('role-access')
export class RoleAccessController {
    constructor(private readonly roleAccessService: RoleAccessService) {}

    @Post()
    create(@Body() createRoleAccessDto: CreateRoleAccessDto) {
        return this.roleAccessService.create(createRoleAccessDto);
    }

    @Get()
    findAll(@Req() req: Request) {
        return this.roleAccessService.findAll(req);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.roleAccessService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateRoleAccessDto: UpdateRoleAccessDto,
    ) {
        return this.roleAccessService.update(+id, updateRoleAccessDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.roleAccessService.remove(+id);
    }
}

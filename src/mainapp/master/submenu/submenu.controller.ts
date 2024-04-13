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
import { SubmenuService } from './submenu.service';
import { CreateSubmenuDto } from './dto/create-submenu.dto';
import { UpdateSubmenuDto } from './dto/update-submenu.dto';
import { Request } from 'express';

@Controller('submenu')
export class SubmenuController {
    constructor(private readonly submenuService: SubmenuService) {}

    @Post()
    create(@Body() createSubmenuDto: CreateSubmenuDto) {
        return this.submenuService.create(createSubmenuDto);
    }

    @Get()
    findAll(@Req() req: Request) {
        return this.submenuService.findAll(req);
    }

    @Get('menu/:id')
    findByMenu(@Param('id') id: string) {
        return this.submenuService.findByMenuId(id);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.submenuService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateSubmenuDto: UpdateSubmenuDto,
    ) {
        return this.submenuService.update(id, updateSubmenuDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.submenuService.remove(id);
    }
}

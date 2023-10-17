import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UsePipes,
    ValidationPipe,
    Req,
    //   Req,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Request } from 'express';
// import { Request } from 'express';

@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) { }

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() createMenuDto: CreateMenuDto) {
        return this.menuService.create(createMenuDto);
    }

    @Get()
    findAll(@Req() req: Request) {
        return this.menuService.findAll(req);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.menuService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
        return this.menuService.update(+id, updateMenuDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.menuService.remove(+id);
    }
}

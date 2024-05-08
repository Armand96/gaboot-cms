import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Request } from 'express';
import { UploadInterceptor, UploadFile } from 'src/services/general/decorator/upload.decorator';

@Controller('banner')
export class BannerController {
    constructor(private readonly bannerService: BannerService) { }

    @Post()
    @UploadInterceptor('img', {
        whitelist: true,
        transform: true,
    })
    create(@Body() createBannerDto: CreateBannerDto, @UploadFile() file: Express.Multer.File) {
        return this.bannerService.create(createBannerDto, file);
    }

    @Get()
    findAll(@Req() req: Request) {
        return this.bannerService.findAll(req);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.bannerService.findOne(id);
    }

    @Patch(':id')
    @UploadInterceptor('img')
    update(@Param('id') id: string, @Body() updateBannerDto: UpdateBannerDto, @UploadFile() file: Express.Multer.File) {
        return this.bannerService.update(id, updateBannerDto, file);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.bannerService.remove(id);
    }
}

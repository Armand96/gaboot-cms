import { Controller, Get, Post, Body, Patch, Param, Delete, Req, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, Res } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync, createReadStream } from 'fs';
import { join } from 'path';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('img'))
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )
  create(@Body() createCategoryDto: CreateCategoryDto,
  @UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 1000000 }),
        new FileTypeValidator({ fileType: 'image' }),
      ],
      fileIsRequired: false,
    }),
  )
  file: Express.Multer.File) {
    return this.categoriesService.create(createCategoryDto, file);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.categoriesService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('img'))
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, 
  @Body() updateCategoryDto: UpdateCategoryDto, @UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 1000000 }),
        new FileTypeValidator({ fileType: 'image' }),
      ],
      fileIsRequired: false,
    }),
  )
  file: Express.Multer.File) {
    return this.categoriesService.update(+id, updateCategoryDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }

  @Get('image/:id')
  async getImage(@Param('id') id: number, @Res() res: Response) {
    const user = await this.categoriesService.getImage(id);
    if (user.imagePath == null || user.imagePath == '') {
      return res
        .status(404)
        .json({ statusCode: 404, error: 'Not Found', message: 'Not Found' });
    }

    let exist = existsSync(join(process.cwd(), user.imagePath));
    if (exist) {
      const file = createReadStream(join(process.cwd(), user.imagePath));
      file.pipe(res);
    } else {
      return res
        .status(404)
        .json({ statusCode: 404, error: 'Not Found', message: 'Not Found' });
    }
  }
}

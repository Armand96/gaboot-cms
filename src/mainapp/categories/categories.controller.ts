import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
    FileTypeValidator,
    MaxFileSizeValidator,
    ParseFilePipe,
    UploadedFile,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
    Res,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync, createReadStream } from 'fs';
import { join } from 'path';
import { UploadFile, UploadInterceptor } from 'src/services/general/decorator/upload.decorator';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    @UploadInterceptor('img', {
        whitelist: true,
        transform: true,
    })
    create(
        @Body() createCategoryDto: CreateCategoryDto,
        @UploadFile() file: Express.Multer.File
    ) {
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
    @UploadInterceptor('img')
    update(
        @Param('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto,
        @UploadFile() file: Express.Multer.File
    ) 
    {
        return this.categoriesService.update(+id, updateCategoryDto, file);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.categoriesService.remove(+id);
    }

    @Get('image/:id')
    async getImage(@Param('id') id: number, @Res() res: Response) {
        const user = await this.categoriesService.getImage(id);
        if (user.imgPath == null || user.imgPath == '') {
            return res.status(404).json({
                statusCode: 404,
                error: 'Not Found',
                message: 'Not Found',
            });
        }

        const exist = existsSync(join(process.cwd(), user.imgPath));
        if (exist) {
            const file = createReadStream(join(process.cwd(), user.imgPath));
            file.pipe(res);
        } else {
            return res.status(404).json({
                statusCode: 404,
                error: 'Not Found',
                message: 'Not Found',
            });
        }
    }
}

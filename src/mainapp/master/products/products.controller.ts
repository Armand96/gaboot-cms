import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
    FileTypeValidator,
    MaxFileSizeValidator,
    ParseFilePipe,
    UploadedFile,
    Res,
    UploadedFiles,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Request, Response } from 'express';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import { CategoriesService } from 'src/mainapp/categories/categories.service';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
        private readonly categoryService: CategoriesService
    ) {}

    /* GET CATEGORY FOR CREATE */
    @Get('/categories')
    async getCategories(@Req() req: Request) {
        console.log('di mari');
        return this.categoryService.findAll(req);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    create(
        @Body() createProductDto: CreateProductDto,
    ) {
        return this.productsService.create(createProductDto);
    }

    @Get()
    findAll(@Req() req: Request) {
        return this.productsService.findAll(req);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productsService.findOne(+id);
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('img'))
    @UsePipes(new ValidationPipe())
    update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 1000000 }),
                    new FileTypeValidator({ fileType: 'image' }),
                ],
                fileIsRequired: false,
            }),
        )
        file: Express.Multer.File,
    ) {
        return this.productsService.update(+id, updateProductDto, file);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productsService.remove(+id);
    }

    /* ====================================================== */
    @Get('productImages/:id')
    async getProductImages(@Param('id') id:number){
        return this.productsService.getProductImages(id);
    }

    @Post('productImages/:id')
    @UseInterceptors(FileFieldsInterceptor([{name:'img'}]))
    async uploadMultipleImages(
        @Param('id') id:number,
        @UploadedFiles(
            new ParseFilePipe({
                fileIsRequired: true,
            }),
        )
        files: Express.Multer.File[],
    ){
        return this.productsService.uploadImages(id, files);
    }

    @Delete('productImages/:id')
    async removeImage(@Param('id') id:number){
        return this.productsService.removeImages(id);
    }

    @Get('image/:id')
    async getImage(@Param('id') id: number, @Res() res: Response) {
        const product = await this.productsService.productImage(id);
        if (product.imagePath == null || product.imagePath == '') {
            return res.status(404).json({
                statusCode: 404,
                error: 'Not Found',
                message: 'Not Found',
            });
        }

        const exist = existsSync(join(process.cwd(), product.imagePath));
        if (exist) {
            const file = createReadStream(
                join(process.cwd(), product.imagePath),
            );
            file.pipe(res);
        } else {
            return res.status(404).json({
                statusCode: 404,
                error: 'Not Found',
                message: 'Not Found',
            });
        }
    }

    /* GET IMAGE */
    @Get('image/thumb/:id')
    async getImageThumb(@Param('id') id: number, @Res() res: Response) {
        const user = await this.productsService.productImage(id);
        if (user.imagePath == null || user.thumbnailPath == '') {
            return res.status(404).json({
                statusCode: 404,
                error: 'Not Found',
                message: 'Not Found',
            });
        }

        const exist = existsSync(join(process.cwd(), user.thumbnailPath));
        if (exist) {
            const file = createReadStream(
                join(process.cwd(), user.thumbnailPath),
            );
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

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
    ParseFilePipe,
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
import { UploadFile, UploadInterceptor } from 'src/services/general/decorator/upload.decorator';

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
    create(@Body() createProductDto: CreateProductDto) 
    {
        return this.productsService.create(createProductDto);
    }

    @Get()
    findAll(@Req() req: Request) 
    {
        return this.productsService.findAll(req);
    }

    @Get(':id')
    findOne(@Param('id') id: string) 
    {
        return this.productsService.findOne(id);
    }

    @Patch(':id')
    @UploadInterceptor('img')
    @UsePipes(new ValidationPipe())
    update( @Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @UploadFile() file: Express.Multer.File) 
    {
        return this.productsService.update(id, updateProductDto, file);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productsService.remove(id);
    }

    /* ====================================================== */
    @Get('productImages/:id')
    async getProductImages(@Param('id') id: string){
        return this.productsService.getProductImages(id);
    }

    @Post('productImages/:id')
    @UseInterceptors(FileFieldsInterceptor([{name:'img'}]))
    async uploadMultipleImages(@Param('id') id: string, @UploadedFiles( new ParseFilePipe({ fileIsRequired: true })) files: Express.Multer.File[] )
    {
        return this.productsService.uploadImages(id, files);
    }

    @Delete('productImages/:id')
    async removeImage(@Param('id') id: string)
    {
        return this.productsService.removeImages(id);
    }

    @Get('image/:id')
    async getImage(@Param('id') id: string, @Res() res: Response) 
    {
        const product = await this.productsService.productImage(id);
        if (product.image_path == null || product.image_path == '') 
        {
            return res.status(404).json({
                statusCode: 404,
                error: 'Not Found',
                message: 'Not Found',
            });
        }

        const exist = existsSync(join(process.cwd(), product.image_path));
        if (exist) 
        {
            const file = createReadStream(
                join(process.cwd(), product.image_path),
            );
            file.pipe(res);
        } 
        else 
        {
            return res.status(404).json({
                statusCode: 404,
                error: 'Not Found',
                message: 'Not Found',
            });
        }
    }

    /* GET IMAGE */
    @Get('image/thumb/:id')
    async getImageThumb(@Param('id') id: string, @Res() res: Response) {
        const user = await this.productsService.productImage(id);
        if (user.image_path == null || user.thumbnail_path == '') 
        {
            return res.status(404).json({
                statusCode: 404,
                error: 'Not Found',
                message: 'Not Found',
            });
        }

        const exist = existsSync(join(process.cwd(), user.thumbnail_path));
        if (exist) 
        {
            const file = createReadStream(
                join(process.cwd(), user.thumbnail_path),
            );
            file.pipe(res);
        } 
        else 
        {
            return res.status(404).json({
                statusCode: 404,
                error: 'Not Found',
                message: 'Not Found',
            });
        }
    }
}

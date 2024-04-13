import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
    UploadedFile,
    ParseFilePipe,
    MaxFileSizeValidator,
    FileTypeValidator,
    Req,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { UploadFile, UploadInterceptor } from 'src/services/general/decorator/upload.decorator';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {}

    @Post()
    @UploadInterceptor('img', {
        whitelist: true,
        transform: true,
    })
    create(@Body() createCustomerDto: CreateCustomerDto, @UploadFile() file: Express.Multer.File) 
    {
        return this.customersService.create(createCustomerDto, file);
    }

    @Get()
    findAll(@Req() req: Request) 
    {
        return this.customersService.findAll(req);
    }

    @Get(':id')
    findOne(@Param('id') id: string) 
    {
        return this.customersService.findOne(id);
    }

    @Patch(':id')
    @UploadInterceptor('img')
    update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto, @UploadFile() file: Express.Multer.File) 
    {
        return this.customersService.update(id, updateCustomerDto, file);
    }

    @Delete(':id')
    remove(@Param('id') id: string) 
    {
        return this.customersService.remove(id);
    }
}

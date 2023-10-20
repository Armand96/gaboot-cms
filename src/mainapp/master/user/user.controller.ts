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
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Req, UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { Response, Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
// import * as fs from 'fs';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  /* CREATE */
  @Post()
  @UseInterceptors(FileInterceptor('img'))
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )
  create(
    @Body() createUserDto: CreateUserDto,
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
    return this.userService.create(createUserDto, file);
  }

  /* READ ALL */
  @Get()
  findAll(@Req() req: Request) {
    return this.userService.findAll(req);
  }

  /* READ ONE */
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  /* UPDATE ONE */
  @Patch(':id')
  @UseInterceptors(FileInterceptor('img'))
  @UsePipes(new ValidationPipe())
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
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
    return this.userService.update(id, updateUserDto, file);
  }

  /* DELETE ONE */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  /* GET IMAGE */
  @Get('image/:id')
  async getImage(@Param('id') id: number, @Res() res: Response) {
    const user = await this.userService.userImage(id);
    if (user.imgPath == null || user.imgPath == '') {
      return res
        .status(404)
        .json({ statusCode: 404, error: 'Not Found', message: 'Not Found' });
    }

    let exist = existsSync(join(process.cwd(), user.imgPath));
    if (exist) {
      const file = createReadStream(join(process.cwd(), user.imgPath));
      file.pipe(res);
    } else {
      return res
        .status(404)
        .json({ statusCode: 404, error: 'Not Found', message: 'Not Found' });
    }
  }

  /* GET IMAGE */
  @Get('image/thumb/:id')
  async getImageThumb(@Param('id') id: number, @Res() res: Response) {
    const user = await this.userService.userImage(id);
    if (user.imgThumbPath == null || user.imgThumbPath == '') {

      return res
        .status(404)
        .json({ statusCode: 404, error: 'Not Found', message: 'Not Found' });
    }

    let exist = existsSync(join(process.cwd(), user.imgThumbPath));
    if (exist) {
      const file = createReadStream(join(process.cwd(), user.imgThumbPath));
      file.pipe(res);
    } else {
      return res
        .status(404)
        .json({ statusCode: 404, error: 'Not Found', message: 'Not Found' });
    }

  }

}
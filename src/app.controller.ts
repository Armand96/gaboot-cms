import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import * as fs from 'fs';
import { join } from 'path';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('images')
    images(@Req() req: Request, @Res() res: Response) {
        if (req.query.image == undefined)
        {
            return res.status(404).json({
                statusCode: 404,
                error: 'Not Found',
                message: 'Not Found',
            });
        }

        const exist = fs.existsSync(join(process.cwd(), req.query.image as string));
        if (exist) {
            const file = fs.createReadStream(join(process.cwd(), req.query.image as string));
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

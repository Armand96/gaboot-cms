import { Injectable } from '@nestjs/common';
import * as pathz from 'path';
import * as sharp from 'sharp';
import * as fs from 'fs';
import { PathImageObj } from './interfaces/path-image';

@Injectable()
export class GeneralService {
    // constructor(public readFileSync){}

    dateNow(date?: Date) {
        const dates = date == null ? Date.now() : date;
        return new Intl.DateTimeFormat('fr-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).format(dates);
    }

    categorizePath(category: string) {
        let pathImage = '';
        let pathThumbImage = '';

        pathImage = `storage/${category}/pictures`;
        pathThumbImage = `storage/${category}/pictures/thumb`;

        const pathObj: PathImageObj = {
            path: pathImage,
            thumbPath: pathThumbImage,
        };

        return pathObj;
    }

    async uploadImage(
        image: Express.Multer.File,
        fileName: string,
        category: string,
    ) {
        const pathObj = this.categorizePath(category);

        fileName = fileName.replace(" ", "_");

        if (!fs.existsSync(pathObj.path)) {
            fs.mkdirSync(pathObj.path, { recursive: true });
        }
        // console.log('after make dir')

        const fileNameSplit = image.originalname.split('.');
        const fileExt = fileNameSplit[fileNameSplit.length - 1];
        const path = `${pathObj.path}/${fileName}.${fileExt}`;
        fs.writeFileSync(path, image.buffer);
        // console.log('after write file');

        /* RESIZE */
        const pathThumb = await this.transform(image, fileName, pathObj);
        // console.log(pathThumb);

        const pathString: PathImageObj = {
            path: path,
            thumbPath: pathThumb,
        };

        return pathString;
    }

    removeImage(path: string) {
        fs.unlinkSync(path);
    }

    /* RESIZE FOR THUMBNAIL */
    async transform(
        image: Express.Multer.File,
        fileName: string,
        pathObj: PathImageObj,
    ): Promise<string> {
        if (!fs.existsSync(pathObj.thumbPath)) {
            fs.mkdirSync(pathObj.thumbPath, { recursive: true });
        }

        const fileNameSplit = image.originalname.split('.');
        const fileExt = fileNameSplit[fileNameSplit.length - 1];
        // const originalName = pathz.parse(image.originalname).name;
        const fileNamePath = `${pathObj.thumbPath}/${fileName}_thumb.${fileExt}`;

        await sharp(image.buffer)
            .metadata()
            .then(({ width, height }) => {
                sharp(image.buffer)
                    .resize({
                        width: Math.round(width * 0.4),
                        height: Math.round(height * 0.4),
                    })
                    .toFile(pathz.join(fileNamePath));
            });
        // .webp({ effort: 3 })

        return fileNamePath;
    }
}

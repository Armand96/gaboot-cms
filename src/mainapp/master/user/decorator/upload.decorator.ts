import { FileTypeValidator, MaxFileSizeValidator, ParseFileOptions, ParseFilePipe, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, ValidationPipeOptions, applyDecorators, createParamDecorator } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

export function UploadInterceptor(fieldName: string, options?: ValidationPipeOptions) {
    return applyDecorators(
        UseInterceptors(FileInterceptor(fieldName)),
        UsePipes(
            new ValidationPipe(options),
        )
    );
}

export function UploadFile(maxSize: number, fileType: string) {
    return UploadedFile(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({ maxSize: maxSize }),
            new FileTypeValidator({ fileType: fileType }),
        ],
        fileIsRequired: false,
    }))
}
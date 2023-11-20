import { DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';

const swagConfig = new DocumentBuilder()
    .setTitle('GABOOT API!!!')
    .setDescription('API DOCS FOR GABOOT CMS APP!!')
    .setVersion('1.0')
    .addTag('GABOOT')
    .addBearerAuth(undefined, 'jwt')
    .build();

const swagOption: SwaggerDocumentOptions = {
    operationIdFactory: (_controllerKey: string, methodKey: string) =>
        methodKey,
};

export { swagConfig, swagOption };

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { wsLogger } from './config/winstonlogger';
import { useContainer } from 'class-validator';
import { SwaggerModule } from '@nestjs/swagger';
import { swagConfig, swagOption } from './config/swagger';

async function bootstrap() {
  const appOptions = {
    cors: true,
    logger: wsLogger,
  };
  const app = await NestFactory.create(AppModule, appOptions);

  const document = SwaggerModule.createDocument(app, swagConfig, swagOption);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { wsLogger } from './config/winstonlogger';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const appOptions = {
    cors: true,
    logger: wsLogger,
  };
  const app = await NestFactory.create(AppModule, appOptions);

  await app.listen(3000);
}
bootstrap();

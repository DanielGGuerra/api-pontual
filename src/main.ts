import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NODE_ENV_TYPE } from './config/validation-schema';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      enableDebugMessages: process.env.NODE_ENV === NODE_ENV_TYPE.development,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );

  const config = new DocumentBuilder().setTitle('API PONTUAL').build();

  SwaggerModule.setup('api', app, () =>
    SwaggerModule.createDocument(app, config),
  );
  await app.listen(process.env.PORT);
}

bootstrap();

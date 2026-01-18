import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {NestFactory} from '@nestjs/core';
import {ValidationPipe} from '@nestjs/common';
import {AppModule} from './App/app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  const origins = process.env.ALLOWED_ORIGINS?.split(',').map((o) => o.trim()) ?? [];

  app.enableCors({
    origin: origins,
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Nar-api')
    .setDescription('Nar API description')
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 8080);
}
void bootstrap();

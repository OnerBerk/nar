import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './App/app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder().setTitle('Nar-api').setDescription('Nar API description').setVersion('1.0').build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  if (process.env.NODE_ENV !== 'production') {
    SwaggerModule.setup('api', app, documentFactory);
  }
  await app.listen(process.env.PORT ?? 8080);
}
void bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
  .setTitle('NestJS TypeOrm')
  .setDescription('NestJS + Typeorm + MySql application')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-documentation', app, document); // http://localhost:3000/api-documentation
  await app.listen(3000);
}
bootstrap();

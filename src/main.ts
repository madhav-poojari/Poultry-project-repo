import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Poultry Project')
    .setDescription('The contains a detailed description of the API used in the poultry project')
    .setVersion('1.0').addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      url: './', // The URL to the generated JSON file
      docExpansion: 'none',
      defaultModelsExpandDepth: -1,
    },
    explorer: true,
    swaggerUrl: '/custom-api-path-json',
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();



import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('PMS_Sunfocus Api')
    .setDescription('list of apis for PMS_Sunfocus')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.SERVER_PORT || 3000);
  console.log('Started on Port: ' + (process.env.SERVER_PORT || 3000));

}
bootstrap();

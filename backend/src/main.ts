// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Specify the allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify the allowed HTTP methods
    credentials: true, // Allow cookies and credentials to be sent cross-origin
  });
  await app.listen(5000);
}
bootstrap();

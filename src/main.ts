// main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv'; // Import dotenv package

async function bootstrap() {
  // Load environment variables from .env file
  dotenv.config();

  // Create an instance of the Nest.js application
  const app = await NestFactory.create(AppModule);

  // Apply a global validation pipe to the application
  app.useGlobalPipes(new ValidationPipe());

  // Start the application and listen for incoming requests on port 3000
  await app.listen(3000);
}

// Bootstrap the application
bootstrap();

// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageSchema } from './image.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://dilki:ADbt20@cluster0.rlyibbt.mongodb.net/?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }]),
    MulterModule.register({ dest: './uploads' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

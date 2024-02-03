import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageSchema } from './image.schema'; // Import ImageSchema here

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://dilki:ADbt20@cluster0.rlyibbt.mongodb.net/?retryWrites=true&w=majority'), // Hardcode MongoDB connection URL here
    MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }]), // Import and define ImageSchema here
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

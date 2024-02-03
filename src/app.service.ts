import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createReadStream } from 'fs';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { Image } from './image.schema';
import { Express } from 'express'; // Import Express from 'express'

@Injectable()
export class AppService {
  constructor(@InjectModel(Image.name) private imageModel: Model<Image>) {}

  getHello(): string {
    return 'Hello World!';
  }

  async uploadFile(file: Express.Multer.File) { // Use Express.Multer.File type
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: 'image-upload',
        Key: `${uuidv4()}-${file.originalname}`,
        Body: createReadStream(file.path),
      })
      .promise();

    const image = new this.imageModel({
      url: uploadResult.Location,
    });
    await image.save();

    return { url: uploadResult.Location };
  }

  async getImages() {
    return this.imageModel.find().exec();
  }
}

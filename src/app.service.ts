import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createReadStream } from 'fs';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { Image } from './image.schema';

@Injectable()
export class AppService {
  private readonly s3: S3;

  constructor(
    @InjectModel('Image') private imageModel: Model<Image>
  ) {
    // Initialize the S3 client with hardcoded credentials and region
    this.s3 = new S3({
      accessKeyId: 'yAKIAR4PFA37XXREC4B7A',
      secretAccessKey: 'y1urBoMy3bkIwxUnhb5MljVQXIjhU3WXUXq3Hnfe',
      region: 'eu-west-2',
    });
  }

  getHello(): string {
    return 'Hello World!';
  }

  async uploadFile(file: Express.Multer.File) {
    const uploadResult = await this.s3.upload({
      Bucket: 'marryem-storage',
      Key: `${uuidv4()}-${file.originalname}`,
      Body: createReadStream(file.path),
    }).promise();

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

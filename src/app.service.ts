import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createReadStream } from 'fs';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { Image } from './image.schema';

@Injectable()
export class AppService {
  constructor(@InjectModel('Image') private imageModel: Model<Image>) {}

  getHello(): string {
    return 'Hello World!';
  }

  async uploadFile(file: Express.Multer.File) {
    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    const uploadResult = await s3.upload({
      Bucket: process.env.S3_BUCKET_NAME,
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

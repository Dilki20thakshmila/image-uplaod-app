"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const fs_1 = require("fs");
const aws_sdk_1 = require("aws-sdk");
const uuid_1 = require("uuid");
let AppService = class AppService {
    constructor(imageModel) {
        this.imageModel = imageModel;
        this.s3 = new aws_sdk_1.S3({
            accessKeyId: 'AKIAR4PFA37XXREC4B7A',
            secretAccessKey: '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',
            region: 'eu-west-2',
        });
    }
    async uploadFile(file) {
        try {
            const uploadResult = await this.s3.upload({
                Bucket: 'marryem-storage',
                Key: `${(0, uuid_1.v4)()}-${file.originalname}`,
                Body: (0, fs_1.createReadStream)(file.path),
            }).promise();
            const image = new this.imageModel({
                url: uploadResult.Location,
            });
            await image.save();
            return { message: 'File uploaded successfully', url: uploadResult.Location };
        }
        catch (error) {
            throw new Error('Error uploading file');
        }
    }
    async getImages() {
        return this.imageModel.find().exec();
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Image')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AppService);
//# sourceMappingURL=app.service.js.map
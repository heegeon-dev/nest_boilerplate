import { ConfigService } from '@nestjs/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import path from 'path';

export const multerOptionsFactory = (
  configService: ConfigService,
): MulterOptions => {
  const s3 = new S3Client({
    region: configService.get('aws.region'),
    credentials: {
      accessKeyId: configService.get('aws.accessKeyId'),
      secretAccessKey: configService.get('aws.secretAccessKey'),
    },
  });
  return {
    storage: multerS3({
      s3,
      bucket: configService.get<string>('aws.S3bucket'),
      key(_req, file, done) {
				done(null,`${file.fieldname}/${new Date().getTime()}${file.originalname}`)
      },
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  };
};
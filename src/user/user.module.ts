import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  User,
  Permission,
  Role,
} from 'src/models/entities';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { multerOptionsFactory } from 'src/utils/multer.option';
import { Mailer } from 'src/utils/mailer';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [User, Permission, Role],
    ),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: multerOptionsFactory,
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [UserService, Mailer],
})
export class UserModule {}

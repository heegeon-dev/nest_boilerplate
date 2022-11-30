import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/models/entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([Permission], 'season'),
  ],
  controllers: [PermissionController],
  providers: [PermissionService]
})
export class PermissionModule {}

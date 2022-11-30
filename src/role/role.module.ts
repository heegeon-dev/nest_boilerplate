import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/models/entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([Role], 'season'),
  ],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {}

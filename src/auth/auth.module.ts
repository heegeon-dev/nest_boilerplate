import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Role, Permission, CompanyInfo } from 'src/models/entities';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { Mailer } from 'src/utils/mailer';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [User, Role, Permission, CompanyInfo],
      'season',
    ),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('secretKey'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, UserService, JwtStrategy, Mailer],
  controllers: [AuthController],
})
export class AuthModule {}

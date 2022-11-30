import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from "./config/configuration";
import { SeasonDBConfigModule, SeasonDBConfigService } from './config/database/season';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { VerificationModule } from './verification/verification.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/${process.env.NODE_ENV}.env`,
      load: [configuration],
      cache: true,
    }),
    // TypeOrmModule.forRootAsync({
    //   name:"admin",
    //   imports: [AdminDBConfigModule],
    //   useClass: AdminDBConfigService,
    //   inject: [AdminDBConfigService],
    // }),
    TypeOrmModule.forRootAsync({
      name:"season",
      imports: [SeasonDBConfigModule],
      useClass: SeasonDBConfigService,
      inject: [SeasonDBConfigService],
    }),
    UserModule,
    AuthModule,
    VerificationModule,
    RoleModule,
    PermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}

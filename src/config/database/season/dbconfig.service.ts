import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
type dbType = "mariadb" | "mysql";
@Injectable()
export class DBConfigService implements TypeOrmOptionsFactory {
  constructor(private config: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      host: this.config.get<string>("database.host"),
      port: this.config.get<number>("database.port"),
      username: this.config.get<string>("database.username"),
      password: this.config.get<string>("database.password"),
      type: this.config.get<dbType>("database.type"),
      database: this.config.get<string>("database.database"),
      entities: [__dirname  + "/**/entities/*.{ts,js}"],
      autoLoadEntities: true,
      keepConnectionAlive: true,
      synchronize: false,
      logging: process.env.NODE_ENV == "production" ? false : true,
    };
  }
}

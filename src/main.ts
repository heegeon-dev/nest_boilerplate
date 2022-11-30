import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import chalk from 'chalk';
import { AppModule } from './app.module';
import pack from '../package.json';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose'],
  });
  let config = app.get(ConfigService);
  app.enableCors();
  // app.use(helmet());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Auth Server')
    .setDescription('The auth server API description')
    .setVersion('0.1')
    .addServer(config.get<string>('authUrl'))
    .addServer("http://localhost:6550")
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api-docs', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true, //암묵적 형변환
      },
      disableErrorMessages: process.env.NODE_ENV == 'production',
    }),
  );

  await app.listen(config.get(`port`));
  Logger.log(chalk.yellow('.......................................')); //eslint-disable-line
  Logger.log(chalk.blue(config.get(`name`))); //eslint-disable-line
  Logger.log(chalk.blue(`App version:\t${pack.version}`)); //eslint-disable-line
  Logger.log(chalk.blue(`Port:\t\t${config.get(`port`)}`)); //eslint-disable-line
  Logger.log(chalk.blue(`Mode:\t\t${process.env.NODE_ENV}`)); //eslint-disable-line
  Logger.log(chalk.blue(`Now:\t\t${new Date().toString()}`));
  Logger.log(chalk.blue('database connection is established'));
  Logger.log(chalk.yellow('.......................................')); //eslint-disable-line
}
bootstrap();

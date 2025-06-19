import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation';
import loggerConfig from './logger/logger.config';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRoot({ useExisting: true, pinoHttp: loggerConfig }),
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
      expandVariables: true,
      validate,
    }),
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

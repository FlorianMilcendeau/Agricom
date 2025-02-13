import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { Logger, PinoLogger } from 'nestjs-pino';
import loggerConfig from './logger/logger.config';

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter({ logger: loggerConfig });
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
    { bufferLogs: true },
  );

  /** Init Logger */
  const logger = app.get(Logger);
  app.useLogger(logger);
  app.flushLogs();
  const pinoLogger = await app.resolve(PinoLogger);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        pinoLogger.error({ metadata: errors.at(0).target }, 'Validation error');
        throw new BadRequestException(
          errors.map((error) => Object.values(error.constraints)).flat(),
        );
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

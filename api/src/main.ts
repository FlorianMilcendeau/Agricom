import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { Logger, LoggerErrorInterceptor, PinoLogger } from 'nestjs-pino';
import loggerConfig from './logger/logger.config';
import { v4 as uuidv4 } from 'uuid';

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter({
    genReqId: (req) => req.headers['x-correlation-id'] ?? uuidv4(),
    logger: loggerConfig,
  });
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
    { bufferLogs: true },
  );

  /** Init Logger */
  const logger = app.get(Logger);
  app.useLogger(logger);
  app.flushLogs();
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  const pinoLogger = await app.resolve(PinoLogger);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        pinoLogger.setContext(ValidationPipe.name);
        pinoLogger.error({ metadata: errors.at(0).target }, 'Validation error');
        throw new BadRequestException(
          errors
            .map((error) =>
              error.children
                ? error.children.map((child) =>
                    Object.values(child.constraints),
                  )
                : Object.values(error.constraints),
            )
            .flat(),
          'Validation error',
        );
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

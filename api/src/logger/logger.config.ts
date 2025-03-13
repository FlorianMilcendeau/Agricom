import { PinoLoggerOptions } from 'fastify/types/logger';

const REDACTED = ['*.password', '*.email'];

export default {
  base: {
    application: 'api',
  },
  redact: REDACTED,
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'dd/mm/yyyy HH:MM:ss Z',
      ignore: 'hostname,req.remotePort,req.remoteAddress',
    },
  },
} satisfies PinoLoggerOptions;

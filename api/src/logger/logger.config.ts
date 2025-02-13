export default {
  base: {
    application: 'api',
  },
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'dd/mm/yyyy HH:MM:ss Z',
      ignore: 'pid,hostname',
    },
  },
};

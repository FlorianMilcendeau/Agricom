import { Provider } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { APP } from 'src/constant';
import { dataSource } from './database.data-source';

export const databaseProviders: Provider[] = [
  {
    provide: APP.TOKEN_PROVIDER.DATA_SOURCE,
    inject: [PinoLogger],
    useFactory: async (logger: PinoLogger) => {
      try {
        logger.setContext('DatabaseProvider');
        logger.info('Connecting to database...');

        logger.info('Database connected successfully');
        return dataSource.initialize();
      } catch (error) {
        logger.error('Error connecting to database', error);
        throw error;
      }
    },
  },
];

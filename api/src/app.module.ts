import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      useExisting: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}

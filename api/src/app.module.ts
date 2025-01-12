import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [LoggerModule.forRoot({ useExisting: true })],
})
export class AppModule {}

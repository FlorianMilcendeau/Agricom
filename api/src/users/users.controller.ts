import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserInput } from './create-users/create-users.dto';
import { PinoLogger } from 'nestjs-pino';

@Controller('users')
export class UsersController {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(UsersController.name);
  }
  @Post()
  create(@Body() user: CreateUserInput) {
    this.logger.info({ user }, 'init user creation');
  }
}

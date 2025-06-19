import { plainToInstance } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsString,
  validateSync,
} from 'class-validator';

export type Environnment = NodeJS.ProcessEnv['NODE_ENV'];

export class EnvironmentVariables {
  @IsIn(['development', 'production', 'test'])
  NODE_ENV: Environnment;

  @IsString()
  DATABASE_HOST: string;

  @IsNumberString()
  DATABASE_PORT: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_NAME: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_SCHEMA: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_PASSWORD: string;
}

export const validate = (config: NodeJS.ProcessEnv): EnvironmentVariables => {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(
      `Configuration validation error: ${errors
        .map((error) => Object.values(error.constraints || {}).join(', '))
        .join('; ')}`,
    );
  }

  return validatedConfig;
};

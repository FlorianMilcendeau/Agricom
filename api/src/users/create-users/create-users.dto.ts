import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsString,
  IsStrongPassword,
  ValidateNested,
} from 'class-validator';

class CreateUserAddressInput {
  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  zipCode: string;

  @IsString()
  country: string;
}

type Gender = 'Male' | 'Female';

export class CreateUserInput {
  @IsString()
  name: string;

  @IsString()
  firstName: string;

  @IsDateString()
  birthday: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsString()
  gender: Gender;

  @Type(() => CreateUserAddressInput)
  @ValidateNested()
  address1: CreateUserAddressInput;

  @Type(() => CreateUserAddressInput)
  @ValidateNested()
  address2: CreateUserAddressInput;
}

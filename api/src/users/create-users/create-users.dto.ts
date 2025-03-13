import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsIn,
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
  @IsIn(['Male', 'Female'])
  gender: Gender;

  @Type(() => CreateUserAddressInput)
  @ValidateNested()
  address1: CreateUserAddressInput;

  @Type(() => CreateUserAddressInput)
  @ValidateNested()
  address2: CreateUserAddressInput;
}

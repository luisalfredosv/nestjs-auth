import { IsBoolean, IsEmail, IsNotEmpty } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surname: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsBoolean()
  isAdmin: boolean;
}

export class LoginUserDto extends OmitType(CreateUserDto, [
  'name',
  'surname',
  'isAdmin',
] as const) {}

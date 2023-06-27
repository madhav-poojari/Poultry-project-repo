import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['role'] as const),
) {
  @ApiProperty()
  email?: string;
  @ApiProperty()
  firstName?: string;
  @ApiProperty()
  password?: string;
  @ApiProperty()
  lastName?: string;
  @ApiProperty()
  phoneNumber?: number;
  @ApiProperty()
  role?: string;
  @ApiProperty()
  site?: number;
  @ApiProperty()
  region?: number;
}

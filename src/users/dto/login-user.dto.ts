import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty()
  @IsEmail()
  readonly email: string;
  @ApiProperty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
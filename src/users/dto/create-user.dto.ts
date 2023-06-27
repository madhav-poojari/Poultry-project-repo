import { IsString, IsEmail, MinLength, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  @IsString()
  readonly firstName: string;
  @ApiProperty()
  @IsEmail()
  readonly email: string;
  @IsString()
  @ApiProperty()
  @MinLength(6)
  password: string;
  @IsString()
  @ApiProperty()
  readonly lastName: string;
  @IsNumber()
  @ApiProperty()
  readonly phoneNumber: number;
  @IsString()
  @ApiProperty()
  readonly role: string;
  @IsNumber()
  @ApiProperty()
  readonly site: number;
  @IsNumber()
  @ApiProperty()
  readonly region: number;
}

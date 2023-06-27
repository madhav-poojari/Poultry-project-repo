import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';
import { CreateShedDto } from './create-shed.dto';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class UpdateShedDto extends PartialType(CreateShedDto) {
  @ApiProperty()
  Name?: string;
  @ApiProperty()
  healthCheckup?: boolean;
  @ApiProperty()
  overseer?: string;
  @ApiProperty()
  henCount?: number;
  @ApiProperty()
  region?: number;
  @ApiProperty()
  site?: number;
}

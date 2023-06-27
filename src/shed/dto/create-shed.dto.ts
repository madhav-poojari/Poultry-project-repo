import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class CreateShedDto {
  @ApiProperty()
  @IsString()
  readonly Name: string;
  @ApiProperty()
  @IsBoolean()
  readonly healthCheckup: boolean;
  @ApiProperty()
  @IsString()
  readonly overseer: string;
  @ApiProperty()
  @IsNumber()
  readonly henCount: number;
  @ApiProperty()
  @IsNumber()
  readonly region: number;
  @ApiProperty()
  @IsNumber()
  readonly site: number;
}

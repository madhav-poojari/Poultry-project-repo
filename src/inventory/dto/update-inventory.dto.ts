import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';
import { CreateInventoryDto } from './create-inventory.dto';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {
  @ApiProperty()
  item?: string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  sharedAcross?: string;
  @ApiProperty()
  belongsTo?: string;
}

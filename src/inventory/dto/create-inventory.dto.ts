import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateInventoryDto {
  @ApiProperty()
  @IsString()
  readonly item: string;
  @ApiProperty()
  @IsString()
  readonly description: string;
  @ApiProperty()
  @IsString()
  readonly sharedAcross: string;
  @ApiProperty()
  @IsString()
  readonly belongsTo: string;
}

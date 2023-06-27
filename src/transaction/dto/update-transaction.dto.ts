import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';
import { CreateTransactionDto } from './create-transaction.dto';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  @ApiProperty()
  transactionType?: string;

  @ApiProperty()
  title?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  amount?: number;

  @ApiProperty()
  overseerID?: string;

  @ApiProperty()
  site?: number;

  @ApiProperty()
  region?: number;
}

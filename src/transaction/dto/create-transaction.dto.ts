import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsNumber } from 'class-validator';


export class CreateTransactionDto {

   
    @ApiProperty()
    @IsString()
    readonly transactionType: string;
    @IsString()
    @ApiProperty()
    readonly title: string;
    @IsString()
    @ApiProperty()
    readonly description: string;
    @IsNumber()
    @ApiProperty()
    readonly amount: number;
    @IsString()
    @ApiProperty()
    readonly overseerID: string;
    @IsNumber()
    @ApiProperty()
    readonly site: number;
    @IsNumber()
    @ApiProperty()
    readonly region: number;
  
  
  }
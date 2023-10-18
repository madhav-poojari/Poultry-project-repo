import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateNoteDto {
  
  
 @ApiProperty()
  @IsString()
  readonly title: string;
  @ApiProperty()
  @IsString()
  readonly description: string;
  @ApiProperty()
  @IsBoolean()
  readonly isCompleted: boolean;
  @ApiProperty()
  @IsString()
  readonly deadline: string;
}



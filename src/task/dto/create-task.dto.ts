import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateTaskDto {
  
  
 @ApiProperty()
  @IsString()
  readonly title: string;
  @ApiProperty()
  @IsString()
  readonly description: string;
  @ApiProperty()
  @IsString()
  readonly overseerID: string;
  @ApiProperty()
  @IsBoolean()
  readonly isCompleted: boolean;
  @ApiProperty()
  @IsString()
  readonly deadline: string;
}



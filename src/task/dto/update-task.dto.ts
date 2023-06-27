import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty()
  title?: string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  overseerID?: string;
  @ApiProperty()
  deadline?: string;
  @ApiProperty()
  isCompleted?: boolean;
}




  
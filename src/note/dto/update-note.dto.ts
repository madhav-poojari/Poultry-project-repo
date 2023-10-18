import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';
import { CreateNoteDto } from './create-note.dto';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  @ApiProperty()
  title?: string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  userID?: string;
  @ApiProperty()
  deadline?: string;
  @ApiProperty()
  isCompleted?: boolean;
}




  
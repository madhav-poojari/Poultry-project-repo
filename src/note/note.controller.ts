import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/gaurds/roles.guard';
import { UpdateNoteDto } from './dto/update-note.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('note')
@ApiTags('note')
export class NoteController {
  constructor(
    private readonly noteService: NoteService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}
  //create note
  @Post()
  @Roles()
  @UseGuards(RolesGuard)
  async createNote(
    @Res() response,
    @Req() request,
    @Body() createNoteDto: CreateNoteDto,
  ) {
    try {
      // console.log(request.decodedToken);
      createNoteDto['userID'] = request.decodedToken['userId'];
      console.log(createNoteDto);
    
      const newNote = await this.noteService.create(createNoteDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'item has been created successfully',
        newNote,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: item not created!',
        error: err,
      });
    }
  }
  //delete note
  @Delete('/:id')
  @Roles()
  @UseGuards(RolesGuard)
  async deleteNote(@Res() response, @Param('id') noteId: string) {
    try {
      const deletedNote = await this.noteService.deleteNote(noteId);
      return response.status(HttpStatus.OK).json({
        message: 'Note deleted successfully',
        deletedNote,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/')
  @Roles()
  @UseGuards(RolesGuard)
  async getMine(@Res() response,  @Req() request,) {
    try {
      const uid= request.decodedToken['userId'];
      const noteData = await this.noteService.getMyNotes(uid);
      return response.status(HttpStatus.OK).json({
        message: 'user Note data found successfully',
        noteData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  //get all notesroute
  @Get('/all')
  @Roles()
  @UseGuards(RolesGuard)
  async getAll(@Res() response) {
    try {
      const noteData = await this.noteService.getAllNotes();
      return response.status(HttpStatus.OK).json({
        message: 'All Note data found successfully',
        noteData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put(':id')
  @Roles()
  @UseGuards(RolesGuard)
  async updateNote(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ): Promise<any> {
    // Logic to update the note
    const updatedNote = await this.noteService.updateNote(id, updateNoteDto);
    return updatedNote;
  }
}

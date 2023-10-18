import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note, NoteDocument } from './interface/note.interface';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NoteService {
  constructor(
    @InjectModel('Note')
    private readonly noteModel: Model<NoteDocument>,
  ) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    try {
      console.log(createNoteDto);
      const createdNote = new this.noteModel(createNoteDto);
      return createdNote.save();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteNote(noteId: string): Promise<Note> {
    try {
      const deletedNote = await this.noteModel.findByIdAndDelete(noteId).exec();
      if (!deletedNote) {
        throw new NotFoundException('Note not found');
      }
      return deletedNote;
    } catch (error) {
      throw new NotFoundException('note not found');
      return error;
    }
  }
  async getNoteById(noteId: string): Promise<Note> {
    const note = await this.noteModel.findById(noteId).exec();
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }
  async getNoteBySite(sitenum: string): Promise<Note[]> {
    const note = await this.noteModel
      .find({ belongsTo: sitenum, sharedAcross: 'site' })
      .exec();
    if (!note) {
      throw new NotFoundException('Site not found');
    }
    return note;
  }
  async getNoteByRegion(regionnum: string): Promise<Note[]> {
    const note = await this.noteModel
      .find({ belongsTo: regionnum, sharedAcross: 'region' })
      .exec();
    if (!note) {
      throw new NotFoundException('Region not found');
    }
    return note;
  }

  async getAllNotes(): Promise<Note[]> {
    return this.noteModel.find().exec();
  }
  async getMyNotes(uid: string): Promise<Note[]> {
    return this.noteModel.find({ userID: uid }).exec();
  }

  async updateNote(
    noteId: string,
    updateNoteDto: UpdateNoteDto,
  ): Promise<Note> {
    console.log(updateNoteDto);
    // updateNoteDto['role'] = '';
    const updatedNote = await this.noteModel.findByIdAndUpdate(
      noteId,
      updateNoteDto,
      { new: true },
    );

    if (updatedNote) {
      return updatedNote;
    } else {
      throw new NotFoundException('Note not found');
    }
  }
}

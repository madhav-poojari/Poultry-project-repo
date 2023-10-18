import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { noteSchema } from './noteSchema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Note', schema: noteSchema }]),
    AuthModule,
    UsersModule,
  ],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}

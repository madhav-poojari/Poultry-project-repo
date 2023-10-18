import { Document } from 'mongoose';
export interface Note extends Document {
  readonly title: string;
  readonly description: string;
  readonly deadline: string;
  readonly overseerID: string;
  readonly isCompleted: boolean;
}
export type NoteDocument = Note & Document;

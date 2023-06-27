import { Document } from 'mongoose';
export interface Task extends Document {
  readonly title: string;
  readonly description: string;
  readonly deadline: string;
  readonly overseerID: string;
  readonly isCompleted: boolean;
}
export type TaskDocument = Task & Document;
